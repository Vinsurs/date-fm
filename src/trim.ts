/**
 * @description strip space in string
 * @param str {String}
 * @returns  {string} String with leading and trailing spaces removed
 */
export default function trim(str: string): string {
  return str.replace(/^(\s+)|(\s+)$/g, '');
}
