/**
 * @description Determines whether a string begins with the specified character
 * @param  {string} str
 * @param  {string} lead
 * @returns {string} padded string
 */
export default function startsWith(str: string, lead: string): boolean {
  return str.indexOf(lead) === 0;
}
