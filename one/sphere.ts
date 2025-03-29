import { toRadians } from "./math"
import { Coordinate } from "./types"

export const EarthRadius = 6371008.8  // meters

/**
 * 计算两点之间大圆距离(Haversine公式)
 * @param startCoord 起点坐标
 * @param endCoord 终点坐标
 * @returns 两点之间的距离（单位：米）
 */
export function getDistance(startCoord: Coordinate, endCoord: Coordinate) {
    const lat1Rad = toRadians(startCoord[1])
    const lat2Rad = toRadians(endCoord[1])
    const dLonRad = toRadians(endCoord[0] - startCoord[0])
    const dLatRad = lat2Rad - lat1Rad
    const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2)
    return EarthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
/**
 * 计算两点之间大圆距离（Vincenty公式，更精确）
 * @param startCoord 起点坐标
 * @param endCoord 终点坐标
 * @returns 两点之间的距离（单位：米）
 */
export function getDistancePlus(startCoord: Coordinate, endCoord: Coordinate) {
    const a: number = 6378137.0; // WGS-84椭球体长半轴
    const b: number = 6356752.314245; // WGS-84椭球体短半轴
    const f: number = 1 / 298.257223563; // 扁率

    const L: number = toRadians(endCoord[0] - startCoord[0]);
    const U1: number = Math.atan((1 - f) * Math.tan(toRadians(startCoord[1])));
    const U2: number = Math.atan((1 - f) * Math.tan(toRadians(endCoord[1])));
    const sinU1: number = Math.sin(U1);
    const cosU1: number = Math.cos(U1);
    const sinU2: number = Math.sin(U2);
    const cosU2: number = Math.cos(U2);

    let lambda: number = L;
    let lambdaP: number;
    let iterLimit: number = 100;
    let sinLambda: number, cosLambda: number, sinSigma: number, cosSigma: number;
    let sigma: number, sinAlpha: number, cosSqAlpha: number, cos2SigmaM: number;
    do {
        sinLambda = Math.sin(lambda);
        cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) +
            (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma === 0) return 0;
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) cos2SigmaM = 0;
        const C: number = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * f * sinAlpha *
            (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
    if (iterLimit === 0) return NaN;
    const uSq: number = cosSqAlpha * (a * a - b * b) / (b * b);
    const A: number = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B: number = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const deltaSigma: number = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
        B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    return b * A * (sigma - deltaSigma);
}