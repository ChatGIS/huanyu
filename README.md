# HuanYu
该库主要用于提供GIS地图前端开发常用API，包括二维地图、三维地图以及与地图相关的算法API。  
The repository is used to provide common APIs for GIS map front-end development, including 2D map, 3D map, and map-related algorithm APIs.  

**HuanYu**取自《太平寰宇记》中的“寰宇”二字，与天地、乾坤同义，意指整个宇宙、整个空间。
> **《太平寰宇记》** 是古代中国地理志史，记述了宋朝的疆域版图。广泛引用历代史书、地志、文集、碑刻、诗赋以至仙佛杂记等，计约二百种，且多注明出处，保留了大量珍贵的史料。宋太宗赵炅时地理总志；乐史撰，二百卷，是一部现存较早较完整的**地理**总志。  


## 一、开始 Getting Started
Install the [`huanyu` package](https://www.npmjs.com/package/huanyu):

```
npm i huanyu
```

Import huanyu for your application:
```js
import * as huanyu from 'huanyu'

const huanyuFuncTest = () => {
    console.log(huanyu.hello())
}
```

## 二、功能列表 API List
### 1. Hello HuanYu
- hello: 输出Hello HuanYu!
### 2. 坐标转换
- convertWGS84ToGCJ02: wgs84转gcj02
- convertGCJ02ToWGS84: gcj02转wgs84
- convertGCJ02ToBD09: gcj02转bd09
- convertBD09ToGCJ02: bd09转gcj02
- convertWGS84ToBD09: wgs84转bd09
- convertBD09ToWGS84: bd09转wgs84
### 3. 数据类型工具
- wkt2CoorArray: wkt转坐标数组,支持点、线、面(暂不支持多点多线多面)
- wkt2CoorArrayStr: wkt转坐标数组字符串,支持点、线、面(暂不支持多点多线多面)
