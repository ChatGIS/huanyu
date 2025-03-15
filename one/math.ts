/**
 * 角度值转弧度值
 * @param degrees 
 * @returns 
 */
export const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
};
/**
 * 弧度值转角度值
 * @param radians
 * @returns
 */
export const toDegrees = (radians: number) => {
  return radians * 180 / Math.PI;
};