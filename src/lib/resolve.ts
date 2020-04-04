import trim from './trim';
import startsWith from './startsWith';
import normalize from './normalize';
import formate from './format';
/**
 * @description compute relative date
 * @param  {string} relative The relative date ,eg. `+3year4month`,then:
            oparator:    +(add)      -(sub)
            supportedToken: `year`  `month`  `week` `day` `hour` `minute` `second` `millisecond` `lastyear` `lastmonth` `lastweek` `yesterday` `today` `tomorrow` `now` 
   @param {Date|number} baseDate base date or base timestamp
   @param {string|false} format optional,default to `YYYY-MM-DD HH:II:SS` 
   @returns {Date|string} If `format` is set to false, the parsed date object will be returned, otherwise the format string will be returned
//  */
function resolve(relative: string): Date | string;
function resolve(relative: string, baseDate: Date | number): Date | string;
function resolve(relative: string, format: string | false): Date | string;
function resolve(
  relative: string,
  baseDate: Date | number,
  format: string | false,
): Date | string;
function resolve(relative: string, ...rest: any[]): Date | string {
  let defaultRest = {
    baseDate: new Date(),
    format: 'YYYY-MM-DD HH:II:SS',
  };
  let shouldReturnDate: boolean = false;
  if (rest.length === 1) {
    if ('number' === typeof rest[0] || rest[0] instanceof Date) {
      defaultRest.baseDate = new Date(rest[0]);
    } else if ('string' === typeof rest[0]) {
      defaultRest.format = rest[0];
    } else if (false === rest[0]) {
      shouldReturnDate = true;
    } else {
      throw new TypeError(`invalid parameter type`);
    }
  } else if (rest.length === 2) {
    if ('number' !== typeof rest[0] && !(rest[0] instanceof Date)) {
      throw new TypeError(
        `the type of parameter 'baseDate' is either Date or number timestamp,but ${typeof rest[0]} is accepted!`,
      );
    } else if ('string' !== typeof rest[1] && false !== rest[1]) {
      throw new TypeError(
        `the type of parameter 'format' is either string or false,but ${typeof rest[1]} is accepted!`,
      );
    }
  }

  relative = trim(relative);
  let now = defaultRest.baseDate;
  let year = now.getFullYear();
  let month = now.getMonth();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ms = now.getMilliseconds();
  if (/^(\+)|-/.test(relative)) {
    let reg: RegExp = /((\d+)(?:years?|y))?((\d+)(?:months?|m))?((\d+)(?:weeks?|w))?((\d+)(?:days?|d))?((\d+)(?:hours?|h))?((\d+)(?:minutes?|i))?((\d+)(?:seconds?|s))?((\d+)(?:milliseconds?|MS))?/g;
    let regExpExecArray = reg.exec(relative.slice(1));
    if (regExpExecArray == null) {
      throw TypeError(
        `Parsing error, please make sure your relative parameter format is correct!`,
      );
    }
    let ayear = normalize(regExpExecArray[2]),
      amonth = normalize(regExpExecArray[4]),
      aweek = normalize(regExpExecArray[6]),
      aday = normalize(regExpExecArray[8]),
      ahour = normalize(regExpExecArray[10]),
      aminute = normalize(regExpExecArray[12]),
      asecond = normalize(regExpExecArray[14]),
      ams = normalize(regExpExecArray[16]);

    if (startsWith(relative, '+')) {
      year += ayear;
      month += amonth;
      date += aweek * 7;
      date += aday;
      hours += ahour;
      minutes += aminute;
      seconds += asecond;
      ms += ams;
    } else if (startsWith(relative, '-')) {
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
      case 'now':
        break;
      case 'lastweek':
        date -= 7;
        break;
      case 'lastyear':
        year -= 1;
        break;
      case 'lastmonth':
        month -= 1;
        break;
      case 'yesterday':
        date -= 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
      case 'tomorrow':
        date += 1;
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
      case 'today':
        hours = 0;
        minutes = 0;
        seconds = 0;
        ms = 0;
        break;
      default:
        throw new SyntaxError(
          `unkown token string ${relative} for parameter 'relative'`,
        );
    }
  }
  let computedDate = new Date(year, month, date, hours, minutes, seconds, ms);
  if (shouldReturnDate) {
    return computedDate;
  } else {
    return formate(defaultRest.format, computedDate);
  }
}
export default resolve;
