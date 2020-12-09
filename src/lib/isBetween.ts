import isDate from '../utils/isDate';
import isAfter from './isAfter';
import isBefore from './isBefore';
/**
 * @description Judge whether the date is within the specified range
 * @param  {Date|timestamp} target Date to judge
 * @param  {Date|timestamp} from Start of date range
 * @param  {Date|timestamp} end End of date range
 * @returns {boolean} Returns `true` if the specified date is in the range, `false` otherwise
 */
export default function isBetween(
  target: Date | number,
  start: Date | number,
  end: Date | number,
): boolean {
  if (arguments.length !== 3) {
    throw new RangeError(
      `3 parameters are required ,but ${arguments.length} present`,
    );
  }
  let aDate = [target, start, end];
  aDate.forEach((item, index, arr) => {
    if ('number' !== typeof item && !isDate(item)) {
      throw new TypeError(`Parameters must be type of number or Date`);
    } else if ('number' === typeof item) {
      arr[index] = new Date(item);
    }
  });
  return (
    isAfter(<Date>aDate[0], <Date>aDate[1]) &&
    isBefore(<Date>aDate[0], <Date>aDate[2])
  );
}
