const {
  padWithZero,
  trim,
  startsWith,
  normalize,
  isDate
} = require("../libs/helper");
/*
@action :
    formate date to assigned format
@params:
    -format:String
      all supported date formate token:
        YYYY    2018
        YY      18
        MM      03
        mm      3
        DD      08
        dd      8
        HH      06 12 22h
        hh      6 12
        KK      06 02 12h
        kk      6 2
        II      08
        ii      8
        SS      02
        ss      2
        A       'AM'
        a       'am'
    -date:Date|timestamp
    
@return :A date string in the specified format

*/
function formate(format = "YYYY-MM-DD HH:II:SS", date = new Date()) {
  if (
    "number" !== typeof date &&
    "number" !== typeof Number(date) &&
    !date instanceof Date
  ) {
    throw new TypeError(
      `Cannot resolve 'date' parameter,The parameter 'date' must be either a Date object or a timestamp that represents date`
    );
  }
  date = new Date(date);
  let matchers = [
    {
      test: /Y{4}/,
      replace: date.getFullYear()
    },
    {
      test: /Y{2}/,
      replace: date
        .getFullYear()
        .toString()
        .slice(-2)
    },
    {
      test: /M{2}/,
      replace: padWithZero(date.getMonth() + 1)
    },
    {
      test: /m{2}/,
      replace: date.getMonth() + 1
    },
    {
      test: /D{2}/,
      replace: padWithZero(date.getDate())
    },
    {
      test: /d{2}/,
      replace: date.getDate()
    },
    {
      test: /H{2}/,
      replace: padWithZero(date.getHours())
    },
    {
      test: /h{2}/,
      replace: date.getHours()
    },
    {
      test: /K{2}/,
      replace: padWithZero(date.getHours() % 12)
    },
    {
      test: /k{2}/,
      replace: date.getHours() % 12
    },
    {
      test: /I{2}/,
      replace: padWithZero(date.getMinutes())
    },
    {
      test: /i{2}/,
      replace: date.getMinutes()
    },
    {
      test: /S{2}/,
      replace: padWithZero(date.getSeconds())
    },
    {
      test: /s{2}/,
      replace: date.getSeconds()
    },
    {
      test: /A/,
      replace: date.getHours() > 12 ? "PM" : "AM"
    },
    {
      test: /a/,
      replace: date.getHours() > 12 ? "pm" : "am"
    }
  ];
  matchers.forEach(matcher => {
    format = format.replace(matcher.test, matcher.replace);
  });
  return format;
}
/**
 * @action The alias of formate
 */
formate.format = function(format, date = new Date()) {
  return formate(format, date);
};
/**
 * @action Decide if it's a leap year
 * @params year:Number|String(can be converted to Number)|Date
 * @returns Boolean
 */
formate.isLeapYear = function(year) {
  if (year instanceof Date) {
    year = year.getFullYear();
  } else {
    year = Number(year);
    if (isNaN(year)) {
      throw TypeError(
        `The 'year' parameter should have accepted the Number and Date type, but type ${typeof year} was received`
      );
    }
  }
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};
/**
 * @action Determine whether date1 precedes date2
 * @params date1,date2:Date
 * @returns Boolean
 */
formate.isBefore = function(date1, date2 = new Date()) {
  if (!isDate(date1) && !isDate(date1)) {
    throw new TypeError(`this function should receive Date Object for params`);
  }
  return date1.getTime() < date2.getTime();
};
/**
 * @action Determine whether date1 follows date2
 * @params date1,date2:Date
 * @returns Boolean
 */
formate.isAfter = function(date1, date2 = new Date()) {
  if (!isDate(date1) && !isDate(date1)) {
    throw new TypeError(`this function should receive Date Object for params`);
  }
  return date1.getTime() > date2.getTime();
};
/**
 * @action Determine if two dates are equal
 * @params date1,date2:Date
 * @returns Boolean
 */
formate.isEqual = function(date1, date2 = new Date()) {
  if (!isDate(date1) && !isDate(date1)) {
    throw new TypeError(`this function should receive Date Object for params`);
  }
  return date1.getTime() === date2.getTime();
};
/**
 * @action Compare two dates
 * @params date1,date2:Date
 * @returns -1|0|1
 */
formate.compare = function(date1, date2 = new Date()) {
  return formate.isEqual(date1, date2)
    ? 0
    : formate.isBefore(date1, date2)
    ? -1
    : 1;
};
/**
 * @action :compute relative date
 * @params :
    -relative   The relative date   +3year4month
            oparator:    +(add)      -(sub)
            supportedToken: year  month  day week hour minute second millisecond now lastweek lastyear lastmonth yestoday tomorrow today
    -format?:String 
   @return Date | String
 */
formate.resolve = function(relative, format = "YYYY-MM-DD HH:II:SS") {
  relative = trim(relative);
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ms = now.getMilliseconds();
  if (/^(\+)|-/.test(relative)) {
    let reg = /((?<ayear>\d+)years?)?((?<amonth>\d+)months?)?((?<aweek>\d+)week)?((?<aday>\d+)days?)?((?<ahour>\d*)hours+)?((?<aminute>\d+)minutes?)?((?<asecond>\d+)seconds?)?((?<ams>\d+)milliseconds?)?/g;
    let { ayear, amonth, aweek, aday, ahour, aminute, asecond, ams } = reg.exec(
      relative.slice(1)
    ).groups;
    console.log();
    ayear = normalize(ayear);
    amonth = normalize(amonth);
    aweek = normalize(aweek);
    aday = normalize(aday);
    ahour = normalize(ahour);
    aminute = normalize(aminute);
    asecond = normalize(asecond);
    ams = normalize(ams);

    if (startsWith(relative, "+")) {
      year += ayear;
      month += amonth;
      date += aweek * 7;
      date += aday;
      hours += ahour;
      minutes += aminute;
      seconds += asecond;
      ms += ams;
    } else if (startsWith(relative, "-")) {
      year -= ayear;
      month -= amonth;
      date -= aweek * 7;
      date -= aday;
      hours -= ahour;
      minutes -= aminute;
      seconds -= asecond;
      ms -= ams;
    }
  } else {
    switch (relative) {
      case "now":
        break;
      case "lastweek":
        date -= 7;
        break;
      case "lastyear":
        year -= 1;
        break;
      case "lastmonth":
        month -= 1;
        break;
      case "yestoday":
        date -= 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        break;
      case "tomorrow":
        date += 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        break;
      case "today":
        hours = 0;
        minutes = 0;
        seconds = 0;
        break;
    }
  }
  let computedDate = new Date(year, month, date, hours, minutes, seconds, ms);
  if (format === false) {
    return computedDate;
  } else if (typeof format === "string") {
    return formate(format, computedDate);
  } else {
    throw new TypeError(
      `The 'format' value must be false or a valid format string `
    );
  }
};
/*
 * @action Calculates the specified date relative to the current time
 *@params date:Date|timestamp
 *@return A string relative to the current time
 */
formate.relative = function(date) {
  if (
    "number" !== typeof date &&
    "number" !== typeof Number(date) &&
    !date instanceof Date
  ) {
    throw new TypeError(
      `Cannot resolve 'date' parameter,The parameter 'date' must be either a date object or a timestamp that represents date`
    );
  }
  let result = ""; //result return value
  let is_before = true; //ago
  let now = new Date();
  date = new Date(date);
  let diff_times = date.getTime() - now.getTime(); //diff milliseconds
  if (diff_times > 0) {
    is_before = false; //after
  }
  let diff_secs = Math.abs(diff_times) / 1000; //diff seconds
  let nDis = {
    num: 0, // Different Numbers
    desc: "just now" // description to show
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
      desc: year > 1 ? "years" : "year"
    };
  } else if (month > 0) {
    nDis = {
      num: month,
      desc: month > 1 ? "months" : "month"
    };
  } else if (week > 0) {
    nDis = {
      num: week,
      desc: week > 1 ? "weeks" : "week"
    };
  } else if (day > 0) {
    nDis = {
      num: day,
      desc: day > 1 ? "days" : "day"
    };
  } else if (hour > 0) {
    nDis = {
      num: hour,
      desc: hour > 1 ? "hours" : "hour"
    };
  } else if (minute > 0) {
    nDis = {
      num: minute,
      desc: minute > 1 ? "minutes" : "minute"
    };
  }
  if (nDis.num === 0) {
    result = nDis.desc;
  } else {
    if (is_before) {
      result = nDis.num + " " + nDis.desc + " ago";
    } else {
      result = "after " + nDis.num + " " + nDis.desc;
    }
  }
  return result;
};
module.exports = formate;
