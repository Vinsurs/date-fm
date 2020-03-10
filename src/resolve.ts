import trim from './trim';
import startsWith from './startsWith';
import normalize from './normalize';
import formate from './format';
/**
 * @description compute relative date
 * @param  {String} relative The relative date ,eg. `+3year4month`,then:
            oparator:    +(add)      -(sub)
            supportedToken: `year`  `month`  `week` `day` `hour` `minute` `second` `millisecond` `lastyear` `lastmonth` `lastweek` `yesterday` `today` `tomorrow` `now` 
   @param {String|false} format optional,default to `YYYY-MM-DD HH:II:SS` 
   @returns {Date|String} If `format` is set to false, the parsed date object will be returned, otherwise the format string will be returned
 */
type groups = string | number | undefined;
interface ExecGroup {
  ayear: groups;
  amonth: groups;
  aweek: groups;
  aday: groups;
  ahour: groups;
  aminute: groups;
  asecond: groups;
  ams: groups;
}
export default function resolve(
  relative: string,
  format: string | false = 'YYYY-MM-DD HH:II:SS',
) {
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
    let reg: RegExp = /((?<ayear>\d+)years?)?((?<amonth>\d+)months?)?((?<aweek>\d+)weeks?)?((?<aday>\d+)days?)?((?<ahour>\d+)hours?)?((?<aminute>\d+)minutes?)?((?<asecond>\d+)seconds?)?((?<ams>\d+)milliseconds?)?/g;
    let regExpExecArray = reg.exec(relative.slice(1));
    if (regExpExecArray == null) {
      throw TypeError(
        `Parsing error, please make sure your relative parameter format is correct!`,
      );
    }
    let {
      ayear,
      amonth,
      aweek,
      aday,
      ahour,
      aminute,
      asecond,
      ams,
    }: ExecGroup = <ExecGroup>regExpExecArray.groups;

    ayear = normalize(ayear);
    amonth = normalize(amonth);
    aweek = normalize(aweek);
    aday = normalize(aday);
    ahour = normalize(ahour);
    aminute = normalize(aminute);
    asecond = normalize(asecond);
    ams = normalize(ams);

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
    }
  }
  let computedDate = new Date(year, month, date, hours, minutes, seconds, ms);
  if (format === false) {
    return computedDate;
  } else if (typeof format === 'string') {
    return formate(format, computedDate);
  } else {
    throw new TypeError(
      `The 'format' value must be false or a valid format string `,
    );
  }
}
