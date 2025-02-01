export function wkt2DegreesArray(wkt: string) {
  /* if (wkt.includes('POINT') || wkt.includes('Point') || wkt.includes('point')) {
    return wkt.split('(')[1].split(')')[0].split(' ').map(item => Number(item))
  } else if (wkt.includes('LINESTRING') || wkt.includes('LineString') || wkt.includes('linestring')) {
    return wkt.split('(')[1].split(')')[0].split(',').map(item => item.split(' ').map(item => Number(item)))
  } else */ if (wkt.includes('POLYGON') || wkt.includes('Polygon') || wkt.includes('polygon')) {
    return wkt.split('((')[1].split('))')[0].replaceAll(' ', ',').split(',').map(item => Number(item))
  }
}
export function wkt2CoorArray(wkt: string) {
    if (wkt.includes('POINT') || wkt.includes('Point') || wkt.includes('point')) {
      return wkt.split('(')[1].split(')')[0].split(' ').map(item => Number(item))
    } else if (wkt.includes('LINESTRING') || wkt.includes('LineString') || wkt.includes('linestring')) {
      return wkt.split('(')[1].split(')')[0].split(',').map(item => item.split(' ').map(item => Number(item)))
    } else if (wkt.includes('POLYGON') || wkt.includes('Polygon') || wkt.includes('polygon')) {
      const arr = wkt.split('((')[1].split('))')[0].split(',').map(item => item.split(' ').map(item => Number(item)))
      return [arr]
    }
  }
  
  export function wkt2CoorArrayStr(wkt: string) {
    if (wkt.includes('POINT') || wkt.includes('Point') || wkt.includes('point')) {
      const arr = wkt.split('(')[1].split(')')[0].split(' ').map(item => Number(item))
      return oneDArrayToString(arr)
    } else if (wkt.includes('LINESTRING') || wkt.includes('LineString') || wkt.includes('linestring')) {
      const arr = wkt.split('(')[1].split(')')[0].split(',').map(item => item.split(' ').map(item => Number(item)))    
      return twoDArrayToString(arr)
    } else if (wkt.includes('POLYGON') || wkt.includes('Polygon') || wkt.includes('polygon')) {
      const arr = wkt.split('((')[1].split('))')[0].split(',').map(item => item.split(' ').map(item => Number(item)))
      return threeDArrayToString([arr])
    }
  }
  
  function oneDArrayToString(arr: any[]) {
    return '[' + arr.map(item => JSON.stringify(item)).join(', ') + ']'
  }
  function twoDArrayToString(arr: any[]) {
    return '[' + arr.map(subArr => {
      return '[' + subArr.map(item => JSON.stringify(item)).join(', ') + ']'
    }).join(', ') + ']'
  }
  function threeDArrayToString(arr: any[]) {
    return '[' + arr.map(subArr => {
      return '[' + subArr.map(subSubArr => {
        return '[' + subSubArr.map(item => JSON.stringify(item)).join(', ') + ']'
      }).join(', ') + ']'
    }).join(', ') + ']'
  }