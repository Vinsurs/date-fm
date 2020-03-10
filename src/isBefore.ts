/**
 * @description Determine whether target precedes comparator
 * @param  {Date} target Date to compare
 * @param  {Date} comparator Date to be compared;default to current time
 * @returns {boolean}
 */
import isDate from './isDate';
export default function isBefore(
  target: Date,
  comparator: Date = new Date(),
): boolean {
  if (!isDate(target) && !isDate(comparator)) {
    throw new TypeError(`this function should receive Date Object for param`);
  }
  return target.getTime() < comparator.getTime();
}
