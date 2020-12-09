/**
 * @description Determines whether it is a date object
 * @param  {Date} date
 * @returns {boolean}
 */
export default function isDate(date: any): boolean {
  return date instanceof Date;
}
