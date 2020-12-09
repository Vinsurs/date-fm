/**
 * @description Determines whether a string ends with the specified character
 * @param  {string} str
 * @param  {string} tail
 * @returns {string} padded string
 */
export default function endsWith(str: string, tail: string): boolean {
  return str.indexOf(tail) === str.length - tail.length;
}
