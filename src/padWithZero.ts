/**
 * @description pad num with zero
 * @param {Number} num
 * @returns {String} padded string
 */

export default function padWithZero(num: number): string {
  if (num < 10) {
    return '0' + num;
  }
  return num.toString();
}
