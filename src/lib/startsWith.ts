/**
 * @description Determines whether a string begins with the specified character
 * @param  {String} str
 * @param  {String} lead
 * @returns {String} padded string
 */
export default function startsWith(str: string, lead: string): boolean {
  return str.indexOf(lead) === 0;
}
