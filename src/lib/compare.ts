/**
 * @description Compare two dates
 * @param {Date} target  Date to compare
 * @param {Date} comparator  Date to be compared;default to current time
 * @returns {number} -1 if target is less than comparator, 0 if they are equal, 1 if target is more than comparator
 */
import isEqual from './isEqual';
import isBefore from './isBefore';
enum compareResEnum {
  negative = -1,
  zero,
  positive,
}
export default function compare(
  target: Date,
  comparator: Date = new Date(),
): compareResEnum {
  return isEqual(target, comparator)
    ? compareResEnum.zero
    : isBefore(target, comparator)
    ? compareResEnum.negative
    : compareResEnum.positive;
}
