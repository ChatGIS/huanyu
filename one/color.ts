/**
 * 颜色工具库 - 提供颜色生成、转换和验证功能
 */
// 品牌Logo颜色
export const BrandColors = {
  'Vue': '#42b883',
  'Element': '#409EFF',
  'Github': '#000000',
  'GoogleR': '#EA4335',
  'Wechat': '#07C160',
  'Xiaomi': '#FF7E00',
  'Python': '#FFD43B',
  'Iconfont': '#00f9e5'
}
// 预设的颜色主题
export const Themes = {
  friendly: [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', 
    '#EF476F', '#FFD166', '#073B4C', '#06D6A0', '#118AB2'
  ],
  pastel: [
    '#FFD1DC', '#B5EAD7', '#C7CEEA', '#FFDAC1', '#E2F0CB', 
    '#FFB7B2', '#D291BC', '#FEC8D8', '#E0BBE4', '#BDE0FE'
  ],
  professional: [
    '#2D3047', '#9381FF', '#B8B8FF', '#F8F7FF', '#FFD8BE', 
    '#FF9B71', '#E84855', '#7DBBC3', '#36C4C0', '#1D8A99'
  ],
  brand: Object.values(BrandColors)
};
/**
 * 从预设主题中获取随机颜色
 * @param themeName 主题名称，可选值：friendly, pastel, professional, logo
 * @returns 预设主题中的随机颜色
 */
export function getRandomColorFromTheme(themeName = 'friendly'): string {
  const theme = Themes[themeName] || Themes.friendly;
  const randomIndex = Math.floor(Math.random() * theme.length);
  return theme[randomIndex];
}
/**
 * 生成随机十六进制颜色
 * @param withHash 是否包含 # 前缀，默认为 true
 * @returns 十六进制颜色，如 "#FFFFFF"
 */
export function getRandomHexColor(withHash = true): string {
  const hexChars = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return withHash ? `#${color}` : color;
}
/**
 * 生成随机 RGB 颜色
 * @returns RGB 颜色，如 "rgb(255, 255, 255)"
 */
export function getRandomRGBColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 生成随机 RGBA 颜色
 * @param alpha 透明度（0-1），默认为随机值
 * @returns RGBA 颜色，如 "rgba(255, 255, 255, 0.5)"
 */
export function getRandomRGBAColor(alpha = Math.random()): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

/**
 * 创建一个颜色数组
 * @param count 颜色数量
 * @param format 颜色格式，可选值：hex, rgb, rgba, theme
 * @param options 当 format 为 'theme' 时，指定主题名称；当 format 为 'rgba' 时，指定透明度
 * @returns 颜色数组
 */
export function createColorArray(
  count = 5, 
  format: 'hex' | 'rgb' | 'rgba' | 'theme' = 'hex', 
  options?: string | number
): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    switch (format) {
      case 'rgb':
        colors.push(getRandomRGBColor());
        break;
      case 'rgba':
        colors.push(getRandomRGBAColor(options as number));
        break;
      case 'theme':
        colors.push(getRandomColorFromTheme(options as string));
        break;
      case 'hex':
      default:
        colors.push(getRandomHexColor());
        break;
    }
  }
  return colors;
}

/**
 * 将十六进制颜色转换为 RGB
 * @param hex 十六进制颜色，如 "#FFFFFF" 或 "FFFFFF"
 * @returns RGB 对象，如 { r: 255, g: 255, b: 255 }
 */
export function convertHexToRGB(hex: string): { r: number; g: number; b: number } | null {
  // 移除 # 前缀
  hex = hex.replace(/^#/, '');

  // 验证十六进制格式
  if (!/^([0-9A-F]{3}){1,2}$/i.test(hex)) {
    return null;
  }

  // 解析 3 位或 6 位十六进制
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return { r, g, b };
}

/**
 * 将 RGB 颜色转换为十六进制
 * @param r 红色值 (0-255)
 * @param g 绿色值 (0-255)
 * @param b 蓝色值 (0-255)
 * @param withHash 是否包含 # 前缀，默认为 true
 * @returns 十六进制颜色，如 "#FFFFFF"
 */
export function convertRGBToHex(r: number, g: number, b: number, withHash = true): string {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  return withHash ? `#${hex}` : hex;
}

/**
 * 将 RGB 颜色转换为 RGBA
 * @param rgb RGB 颜色，如 "rgb(255, 255, 255)"
 * @param alpha 透明度 (0-1)
 * @returns RGBA 颜色，如 "rgba(255, 255, 255, 0.5)"
 */
export function convertRGBToRGBA(rgb: string, alpha: number): string {
  // 提取 RGB 值
  const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) {
    return rgb;
  }

  const r = parseInt(rgbMatch[1]);
  const g = parseInt(rgbMatch[2]);
  const b = parseInt(rgbMatch[3]);

  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

/**
 * 将 RGBA 颜色转换为 RGB（移除透明度）
 * @param rgba RGBA 颜色，如 "rgba(255, 255, 255, 0.5)"
 * @returns RGB 颜色，如 "rgb(255, 255, 255)"
 */
export function convertRGBAToRGB(rgba: string): string {
  // 提取 RGBA 值
  const rgbaMatch = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (!rgbaMatch) {
    return rgba;
  }

  const r = parseInt(rgbaMatch[1]);
  const g = parseInt(rgbaMatch[2]);
  const b = parseInt(rgbaMatch[3]);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 验证颜色格式是否有效
 * @param color 颜色值，如 "#FFFFFF"、"rgb(255, 255, 255)" 等
 * @returns 是否为有效的颜色格式
 */
export function isValidColor(color: string): boolean {
  // 验证十六进制
  if (/^#?([0-9A-F]{3}){1,2}$/i.test(color)) {
    return true;
  }

  // 验证 RGB
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color)) {
    return true;
  }

  // 验证 RGBA
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(color)) {
    return true;
  }

  return false;
}    