/**
 * @description Calculates the specified date relative to the current time
 * @param {Date|number} date  Date Object or timestamp
 * @returns {String} A string relative to the current time
 */
export default function relative(date: Date | number): string {
  if (!(date instanceof Date)) {
    if ('number' !== typeof date && isNaN(Number(date))) {
      throw new TypeError(
        `Cannot resolve 'date' parameter,The parameter 'date' must be either a date object or a timestamp that represents date`,
      );
    }
  }
  let result = ''; //result return value
  let is_before = true; //ago
  let now = new Date();
  if ('number' === typeof date) {
    date = new Date(date);
  }
  let diff_times = date.getTime() - now.getTime(); //diff milliseconds
  if (diff_times > 0) {
    is_before = false; //after
  }
  let diff_secs = Math.abs(diff_times) / 1000; //diff seconds
  let nDis = {
    num: 0, // Different Numbers
    desc: 'a few seconds ago', // description to show
  }; //mark diff
  let year = Math.floor(diff_secs / (365 * 24 * 60 * 60));
  let month = Math.floor(diff_secs / (30 * 24 * 60 * 60));
  let week = Math.floor(diff_secs / (7 * 24 * 60 * 60));
  let day = Math.floor(diff_secs / (24 * 60 * 60));
  let hour = Math.floor(diff_secs / (60 * 60));
  let minute = Math.floor(diff_secs / 60);
  if (year > 0) {
    nDis = {
      num: year,
      desc: year > 1 ? 'years' : 'year',
    };
  } else if (month > 0) {
    nDis = {
      num: month,
      desc: month > 1 ? 'months' : 'month',
    };
  } else if (week > 0) {
    nDis = {
      num: week,
      desc: week > 1 ? 'weeks' : 'week',
    };
  } else if (day > 0) {
    nDis = {
      num: day,
      desc: day > 1 ? 'days' : 'day',
    };
  } else if (hour > 0) {
    nDis = {
      num: hour,
      desc: hour > 1 ? 'hours' : 'hour',
    };
  } else if (minute > 0) {
    nDis = {
      num: minute,
      desc: minute > 1 ? 'minutes' : 'minute',
    };
  }
  if (nDis.num === 0) {
    result = nDis.desc;
  } else {
    if (is_before) {
      result = nDis.num + ' ' + nDis.desc + ' ago';
    } else {
      result = 'after ' + nDis.num + ' ' + nDis.desc;
    }
  }
  return result;
}
