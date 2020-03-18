/**
 * @description Determines whether a string ends with the specified character
 * @param  {String} str
 * @param  {String} tail
 * @returns {String} padded string
 */
export default function endsWith(str: string, tail: string): boolean {
  return str.indexOf(tail) === str.length - tail.length;
}
