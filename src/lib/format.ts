import padWithZero from './padWithZero';
import isLeapYear from './isLeapYear';

// constants
import daysAbbr from '../constants/daysAbbr';
import daysFull from '../constants/daysFull';
import monthsAbbr from '../constants/monthsAbbr';
import monthsFull from '../constants/monthsFull';

// interface
interface DefaultOptions {
  format: string;
  date: Date | number;
  options: FormatOptions;
}
interface FormatOptions {
  weekdays?: string[];
  months?: string[];
}
interface Matcher {
  test: RegExp;
  replace: number | string;
}
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
          `AA`    eg.   'AM',
          `aa`    eg.   'am',
          `jj`    eg.   365|366,
          `NN`    eg.   'December',
          `nn`    eg.   'Dec',
          `WW`    eg.   'Sunday',
          `ww`    eg.   'Sun'
  ;
  @param   {Date|number} date Date Object or timestamp,default to current time
  @param   {Object} options Optional,custom month and weekday configuration objects
  @param   {Array} options.weekdays Array of custom weekdays
  @param   {Array} options.months Array of custom months
      
  @returns {String} A date string in the specified format
  
  */
function formate(): string;

function formate(format: string): string;
function formate(date: Date | number): string;
function formate(options: FormatOptions): string;

function formate(format: string, date: Date | number): string;
function formate(format: string, options: FormatOptions): string;
function formate(date: Date | number, options: FormatOptions): string;

function formate(
  format: string,
  date: Date | number,
  options: FormatOptions,
): string;

function formate(...params: any[]): string {
  let defaultOptions: DefaultOptions = {
    format: 'YYYY-MM-DD HH:II:SS',
    date: new Date(),
    options: {},
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
      defaultOptions.options = args[0];
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
        defaultOptions.options = args[1];
      }
    } else {
      // date or timestamp
      if (args[0] instanceof Date) {
        defaultOptions.date = args[0];
      } else if ('number' === typeof args[0]) {
        // timestamp
        defaultOptions.date = new Date(args[0]);
      }
      defaultOptions.options = args[1];
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
    defaultOptions.options = args[2];
  }

  // match
  let { options, format } = defaultOptions;
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
      test: /A{2}/,
      replace: date.getHours() > 12 ? 'PM' : 'AM',
    },
    {
      test: /a{2}/,
      replace: date.getHours() > 12 ? 'pm' : 'am',
    },
    {
      test: /j{2}/,
      replace: isLeapYear(date.getFullYear()) ? 366 : 365,
    },
    {
      test: /N{2}/,
      replace: options.months
        ? options.months[date.getMonth()]
        : monthsFull[date.getMonth()],
    },
    {
      test: /n{2}/,
      replace: options.months
        ? options.months[date.getMonth()]
        : monthsAbbr[date.getMonth()],
    },
    {
      test: /W{2}/,
      replace: options.weekdays
        ? options.weekdays[date.getDay()]
        : daysFull[date.getDay()],
    },
    {
      test: /w{2}/,
      replace: options.weekdays
        ? options.weekdays[date.getDay()]
        : daysAbbr[date.getDay()],
    },
  ];
  try {
    matchers.forEach(matcher => {
      format = format.replace(matcher.test, matcher.replace.toString());
    });
    return format;
  } catch (error) {
    throw new Error(`Format date error, you may pass can's by mistake!`);
  }
}
export default formate;
