import trim from './trim';
/**
 * @description transform format and target string with regexp
 * @param {RegExp} regRule
 * @param {string} format format string
 * @param {string} target formated date string
 * @returns {object} transformed object
 */
function transform(regRule: RegExp, format: string, target: string) {
  let match = format.match(regRule);
  if (match) {
    let obj = {
      len: match[0].length,
      from: match['index'] || 0,
    };
    let result = parseInt(target.substr(obj.from, obj.len));
    return {
      result,
      afterTarget: target.slice(obj.from + result.toString().length),
      afterFormat: format.slice(obj.from + obj.len),
    };
  }
  return {
    result: null,
    afterTarget: target,
    afterFormat: format,
  };
}
/**
 * @description parse date string to native date object
 * @param {string} target string of formated date to be parsed
 * @param {string} format format string
 * @returns {Date} parsed date object
 */
function parse(target: string, format: string) {
  let yearRes = transform(/Y{2,4}/, trim(format), trim(target));
  let monthRes = transform(/m{2}/i, yearRes.afterFormat, yearRes.afterTarget);

  let dateRes = transform(/d{2}/i, monthRes.afterFormat, monthRes.afterTarget);

  let hourRes = transform(
    /(h{2})|(k{2})/i,
    dateRes.afterFormat,
    dateRes.afterTarget,
  );
  let minRes = transform(/i{2}/i, hourRes.afterFormat, hourRes.afterTarget);
  let secRes = transform(/s{2}/i, minRes.afterFormat, minRes.afterTarget);
  let msRes = transform(/XXX/i, secRes.afterFormat, secRes.afterTarget);
  let now = new Date();
  let year = yearRes.result
    ? yearRes.result.toString().length === 2
      ? now.getFullYear().toString().slice(0, -2) + yearRes.result
      : yearRes.result
    : now.getFullYear();
  let month = monthRes.result ? monthRes.result - 1 : now.getMonth();
  let date = dateRes.result ? dateRes.result : now.getDate();
  let hour = hourRes.result ? hourRes.result : now.getHours();
  let min = minRes.result ? minRes.result : now.getMinutes();
  let sec = secRes.result ? secRes.result : now.getSeconds();
  let ms = msRes.result ? msRes.result : now.getMilliseconds();
  return new Date(parseInt(year.toString()), month, date, hour, min, sec, ms);
}
export default parse;
