/**
 * @description Determine whether target follows comparator
 * @param  {Date} target Date to compare
 * @param  {Date} comparator Date to be compared;default to current time
 * @returns {boolean}
 */
import isDate from './isDate';
export default function isAfter(
  target: Date,
  comparator: Date = new Date(),
): boolean {
  if (!isDate(target) && !isDate(comparator)) {
    throw new TypeError(`this function should receive Date Object for param`);
  }
  return target.getTime() > comparator.getTime();
}
