import trim from '../utils/trim';
const supportedFormatDelimiters = ['/','-']
/**
 * @description parse date string to native date object
 * @param {string} target string of formated date to be parsed
 * @param {string} format format string, only supports date format divided by `/` or `-`,such as `2018/2/10 12:32:12` or `2018-2-10 12:32:12.999`
 * @param {Date} backupDate fallback date when no date part is provided
 * @returns {Date} parsed date object
 */
function parse(
  target: string,
  format: string,
  backupDate: Date = new Date()
): Date {
  target = trim(target)
  format = trim(format)
  if(!target || !format) {
    throw new TypeError(`Parsing error: Incorrect format`)
  }
  let hasDatePart: boolean = false;
  let delimiter: string = '';
  for (let index = 0; index < supportedFormatDelimiters.length; index++) {
    const sep = supportedFormatDelimiters[index];
    if(format.indexOf(sep)!==-1) {
      delimiter = sep;
      hasDatePart = true
      break;
    }
  }
  let datetime: Array<string> = target.split(/\s+/);
  let year,month,date,hour,min,sec,ms;
  let timepart: string = '';
  if(hasDatePart && delimiter) {
    let datepart = datetime[0].split(delimiter);
    year = +trim(datepart[0])
    month = +trim(datepart[1])-1
    date = +trim(datepart[2])
    if(datetime[1]) {
      timepart = datetime[1]
    }
  }else {
    year = backupDate.getFullYear()
    month = backupDate.getMonth()
    date = backupDate.getDate()
    timepart = datetime[0]
  }
  if(timepart) {
    let tp = timepart.split(/:|；/)
    hour = +trim(tp[0])
    min = +trim(tp[1])
    let ls = tp[2].split('.')
    sec = +trim(ls[0])
    ms = ls[1]?+trim(ls[1]):0
  }else {
    hour = min = sec = ms = 0;
  }
  return new Date(year, month, date, hour, min, sec, ms);
}
export default parse;
