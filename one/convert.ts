/**
 * 坐标点接口定义
 */
interface Coordinate {
    lon: number; // 经度
    lat: number; // 纬度
}
const PI_BD09 = Math.PI * 3000.0 / 180.0;
/**
 * GCJ-02坐标转换为WGS-84坐标
 * @param lon - GCJ-02经度
 * @param lat - GCJ-02纬度
 * @returns WGS-84坐标
 */
export function convertGCJ02ToWGS84(lon: number, lat: number): Coordinate {
    if (outOfChina(lon, lat)) {
        return { lon, lat };
    }
    const d = delta(lon, lat);
    return {
        lon: lon - d.lon,
        lat: lat - d.lat
    };
}
/**
 * GCJ-02坐标转换为BD-09坐标
 * @param lon - GCJ-02经度
 * @param lat - GCJ-02纬度
 * @returns BD-09坐标
 */
export function convertGCJ02ToBD09(lon: number, lat: number): Coordinate {
    const z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * PI_BD09);
    const theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * PI_BD09);
    return {
        lon: z * Math.cos(theta) + 0.0065,
        lat: z * Math.sin(theta) + 0.006
    };
}
/**
 * WGS-84坐标转换为GCJ-02坐标
 * @param lon - WGS-84经度
 * @param lat - WGS-84纬度
 * @returns GCJ-02坐标
 */
export function convertWGS84ToGCJ02(lon: number, lat: number): Coordinate {
    if (outOfChina(lon, lat)) {
        return { lon, lat };
    }
    const d = delta(lon, lat);
    return {
        lon: lon + d.lon,
        lat: lat + d.lat
    };
}
/**
 * BD-09坐标转换为GCJ-02坐标
 * @param lon - BD-09经度
 * @param lat - BD-09纬度
 * @returns GCJ-02坐标
 */
export function convertBD09ToGCJ02(lon: number, lat: number): Coordinate {
    const x = lon - 0.0065;
    const y = lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI_BD09);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI_BD09);
    return {
        lon: z * Math.cos(theta),
        lat: z * Math.sin(theta)
    };
}
/**
 * WGS-84坐标转换为BD-09坐标
 * @param lon - WGS-84经度
 * @param lat - WGS-84纬度
 * @returns BD-09坐标
 */
export function convertWGS84ToBD09(lon: number, lat: number): Coordinate {
    // 先转换为GCJ-02
    const gcj02 = convertWGS84ToGCJ02(lon, lat);
    // 再转换为BD-09
    return convertGCJ02ToBD09(gcj02.lon, gcj02.lat);
}
/**
 * BD-09坐标转换为WGS-84坐标
 * @param lon - BD-09经度
 * @param lat - BD-09纬度
 * @returns WGS-84坐标
 */
export function convertBD09ToWGS84(lon: number, lat: number): Coordinate {
    // 先转换为GCJ-02
    const gcj02 = convertBD09ToGCJ02(lon, lat);
    // 再转换为WGS-84
    return convertGCJ02ToWGS84(gcj02.lon, gcj02.lat);
}

/**
 * 判断坐标是否在中国范围内（GCJ-02偏移只在中国境内）
 * @param lon - 经度
 * @param lat - 纬度
 * @returns 在中国范围内返回true，否则返回false
 */
function outOfChina(lon: number, lat: number): boolean {
    return !(lon > 72.004 && lon < 137.8347 && lat > 0.8293 && lat < 55.8271);
}

/**
 * 计算GCJ-02与WGS84的偏移量
 * @param lon - 经度
 * @param lat - 纬度
 * @returns 包含经度和纬度偏移量的对象
 */
function delta(lon: number, lat: number): Coordinate {
    const a = 6378245.0; // 地球长半轴
    const ee = 0.00669342162296594323; // 扁率

    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);

    const radLat = lat / 180.0 * Math.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    const sqrtMagic = Math.sqrt(magic);

    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);

    return { lon: dLon, lat: dLat };
}

/**
 * 纬度转换辅助函数
 * @param x - 经度偏移
 * @param y - 纬度偏移
 * @returns 转换后的纬度偏移量
 */
function transformLat(x: number, y: number): number {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

/**
 * 经度转换辅助函数
 * @param x - 经度偏移
 * @param y - 纬度偏移
 * @returns 转换后的经度偏移量
 */
function transformLon(x: number, y: number): number {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
    return ret;
}