/**
 * @action :pad num with zero
 * @param {*} n
 * @return padded string
 */

function padWithZero(n) {
  if (n < 10) {
    n = "0" + n;
  }
  return n;
}
/**
 * @action :strip space in string
 * @param {*} str
 * @return  string
 */
function trim(str) {
  return str.replace(/^(\s+)|(\s+)$/g, "");
}
/**
 * @action :Determines whether a string begins with the specified character
 * @param {*} str opt
 * @return padded string
 */
function startsWith(str, opt) {
  return str.indexOf(opt) === 0;
}
/**
 * @action :Determines whether a string ends with the specified character
 * @param {*} str opt
 * @return padded string
 */
function endsWith(str, opt) {
  return str.indexOf(opt) === str.length - opt.length;
}
/**
 * @action :normalize num or str
 * @param {*} item
 * @return number
 */
function normalize(item) {
  return Number(item) || 0;
}
/**
 * @action :Determines whether it is a date object
 * @param {*} d
 * @return number
 */
function isDate(d) {
  return d instanceof Date;
}
module.exports = {
  padWithZero,
  trim,
  startsWith,
  endsWith,
  normalize,
  isDate
};
