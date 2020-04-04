import padWithZero from './padWithZero';
import isLeapYear from './isLeapYear';

// constants
import daysAbbr from '../constants/daysAbbr';
import daysFull from '../constants/daysFull';
import monthsAbbr from '../constants/monthsAbbr';
import monthsFull from '../constants/monthsFull';
import padForMS from './padForMS';

// interface
interface DefaultOptions {
  format: string;
  date: Date | number;
  options: LocaleOptions;
}
interface LocaleOptions {
  weekdays?: string[];
  weekdaysAbbr?: string[];
  months?: string[];
  monthsAbbr?: string[];
  ampm?: [string, string];
  isPm?: (hour: number) => boolean;
}
interface Matcher {
  test: RegExp;
  replace: number | string;
}
// default localeOptions
let defaultLocaleOptions: LocaleOptions = {
  weekdays: daysFull,
  weekdaysAbbr: daysAbbr,
  months: monthsFull,
  monthsAbbr: monthsAbbr,
  isPm: hour => {
    return hour > 12;
  },
};
/**
 * @description set global locale options for format function
 * @param {Locale} localeOptions locale options
 */
format.setOptions = function(localeOptions: LocaleOptions): void {
  localeOptions.isPm =
    localeOptions.isPm ||
    function(hour) {
      return hour > 12;
    };
  defaultLocaleOptions = Object.assign({}, defaultLocaleOptions, localeOptions);
};
/**
  @description    formate date to assigned format
  @param  {String} format formatting tokens ,default to `YYYY-MM-DD HH:II:SS`; all supported date formate token:
          `YYYY` eg.   2018,
          `YY`   eg.   18,
          `MM`   eg.   03,
          `mm`   eg.   3,
          `DD`   eg.   08,
          `dd`   eg.   8,
          `HH`   eg.   06 ,12 ,22h format,
          `hh`   eg.   6 ,12,
          `KK`   eg.   06 ,02 ,12h format,
          `kk`   eg.   6 ,2,
          `II`   eg.   08,
          `ii`   eg.   8,
          `SS`   eg.   02,
          `ss`   eg.   2,
          `XXX`  millisecond,
          `AA`    eg.   'AM',
          `aa`    eg.   'am',
          `jj`    eg.   365|366,
          `NN`    eg.   'December',
          `nn`    eg.   'Dec',
          `WW`    eg.   'Sunday',
          `ww`    eg.   'Sun'  ;
  @param   {Date|number} date Date Object or timestamp,default to current time
  @param   {Object} options Optional,locale configuration objects
  @param   {Array} options.weekdays Array of custom weekdays
  @param   {Array} options.weekdaysAbbr Array of custom weekdaysAbbr
  @param   {Array} options.months Array of custom months
  @param   {Array} options.monthsAbbr Array of custom monthsAbbr      
  @param   {Array} options.ampm Array of custom ampm      
  @returns {string} A date string in the specified format  
  */
function format(): string;

function format(format: string): string;
function format(date: Date | number): string;
function format(options: LocaleOptions): string;

function format(format: string, date: Date | number): string;
function format(format: string, options: LocaleOptions): string;
function format(date: Date | number, options: LocaleOptions): string;

function format(
  format: string,
  date: Date | number,
  options: LocaleOptions,
): string;

function format(...params: any[]): string {
  let defaultOptions: DefaultOptions = {
    format: 'YYYY-MM-DD HH:II:SS',
    date: new Date(),
    options: Object.assign({}, defaultLocaleOptions),
  };
  const args = params;
  if (args.length === 0) {
    // use default options
  }
  if (args.length === 1) {
    if ('string' === typeof args[0]) {
      defaultOptions.format = args[0];
    } else if (args[0] instanceof Date) {
      defaultOptions.date = args[0];
    } else if ('number' === typeof args[0]) {
      // timestamp
      defaultOptions.date = new Date(args[0]);
    } else {
      // options
      defaultOptions.options = Object.assign(
        {},
        defaultOptions.options,
        args[0],
      );
    }
  }
  if (args.length === 2) {
    if ('string' === typeof args[0]) {
      defaultOptions.format = args[0];
      if (args[1] instanceof Date) {
        defaultOptions.date = args[1];
      } else if ('number' === typeof args[1]) {
        // timestamp
        defaultOptions.date = new Date(args[1]);
      } else {
        defaultOptions.options = Object.assign(
          {},
          defaultOptions.options,
          args[1],
        );
      }
    } else {
      // date or timestamp
      if (args[0] instanceof Date) {
        defaultOptions.date = args[0];
      } else if ('number' === typeof args[0]) {
        // timestamp
        defaultOptions.date = new Date(args[0]);
      }
      defaultOptions.options = Object.assign(
        {},
        defaultOptions.options,
        args[1],
      );
    }
  }
  if (args.length === 3) {
    defaultOptions.format = args[0];
    if (args[1] instanceof Date) {
      defaultOptions.date = args[1];
    } else if ('number' === typeof args[1]) {
      // timestamp
      defaultOptions.date = new Date(args[1]);
    }
    defaultOptions.options = Object.assign({}, defaultOptions.options, args[2]);
  }
  // fallback
  defaultOptions.options.isPm =
    defaultOptions.options.isPm ||
    function(hour) {
      return hour > 12;
    };
  defaultOptions.options.months = defaultOptions.options.months || monthsFull;
  defaultOptions.options.monthsAbbr =
    defaultOptions.options.monthsAbbr || monthsAbbr;
  defaultOptions.options.weekdays = defaultOptions.options.weekdays || daysFull;
  defaultOptions.options.weekdaysAbbr =
    defaultOptions.options.weekdaysAbbr || daysAbbr;
  // match
  let date: Date = <Date>defaultOptions.date;
  let matchers: Array<Matcher> = [
    {
      test: /Y{4}/,
      replace: date.getFullYear(),
    },
    {
      test: /Y{2}/,
      replace: date
        .getFullYear()
        .toString()
        .slice(-2),
    },
    {
      test: /M{2}/,
      replace: padWithZero(date.getMonth() + 1),
    },
    {
      test: /m{2}/,
      replace: date.getMonth() + 1,
    },
    {
      test: /D{2}/,
      replace: padWithZero(date.getDate()),
    },
    {
      test: /d{2}/,
      replace: date.getDate(),
    },
    {
      test: /H{2}/,
      replace: padWithZero(date.getHours()),
    },
    {
      test: /h{2}/,
      replace: date.getHours(),
    },
    {
      test: /K{2}/,
      replace: padWithZero(date.getHours() % 12),
    },
    {
      test: /k{2}/,
      replace: date.getHours() % 12,
    },
    {
      test: /I{2}/,
      replace: padWithZero(date.getMinutes()),
    },
    {
      test: /i{2}/,
      replace: date.getMinutes(),
    },
    {
      test: /S{2}/,
      replace: padWithZero(date.getSeconds()),
    },
    {
      test: /s{2}/,
      replace: date.getSeconds(),
    },
    {
      test: /XXX{2}/,
      replace: padForMS(date.getMilliseconds()),
    },
    {
      test: /A{2}/,
      replace: defaultOptions.options.isPm(date.getHours())
        ? defaultOptions.options.ampm
          ? defaultOptions.options.ampm[1]
          : 'PM'
        : defaultOptions.options.ampm
        ? defaultOptions.options.ampm[0]
        : 'AM',
    },
    {
      test: /a{2}/,
      replace: defaultOptions.options.isPm(date.getHours())
        ? defaultOptions.options.ampm
          ? defaultOptions.options.ampm[1]
          : 'pm'
        : defaultOptions.options.ampm
        ? defaultOptions.options.ampm[0]
        : 'am',
    },
    {
      test: /j{2}/,
      replace: isLeapYear(date.getFullYear()) ? 366 : 365,
    },
    {
      test: /N{2}/,
      replace: defaultOptions.options.months[date.getMonth()],
    },
    {
      test: /n{2}/,
      replace: defaultOptions.options.monthsAbbr[date.getMonth()],
    },
    {
      test: /W{2}/,
      replace: defaultOptions.options.weekdays[date.getDay()],
    },
    {
      test: /w{2}/,
      replace: defaultOptions.options.weekdaysAbbr[date.getDay()],
    },
  ];
  try {
    matchers.forEach(matcher => {
      defaultOptions.format = defaultOptions.format.replace(
        matcher.test,
        matcher.replace.toString(),
      );
    });
    return defaultOptions.format;
  } catch (error) {
    throw new Error(`Format date error, you may pass can's by mistake!`);
  }
}
export default format;
