/**
 * @description Decide if it's a leap year
 * @param {Number|Date} year number of year or date object
 * @returns {Boolean}
 */
import isDate from './isDate';
export default function isLeapYear(year: Date | number): boolean {
  if (isDate(year)) {
    year = (<Date>year).getFullYear();
  } else {
    year = Number(year);
    if (isNaN(year)) {
      throw TypeError(
        `The 'year' parameter should have accepted the Number and Date type, but type ${typeof year} was received`,
      );
    }
  }
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
