/**
 * @description strip space in string
 * @param {string} str  string to be trimed
 * @returns  {string} String with leading and trailing spaces removed
 */
export default function trim(str: string): string {
  return str.replace(/^(\s+)|(\s+)$/g, '');
}
