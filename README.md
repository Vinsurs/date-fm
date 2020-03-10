![npm](https://nodei.co/npm/date-fm.png?downloads=true&downloadRank=true)

# date-fm ![Build Status](https://secure.travis-ci.org/mongodb/node-mongodb-native.svg?branch=2.1) ![coverage status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat) ![NPM version](https://badge.fury.io/js/date-fm.svg)

`date-fm` is a JavaScript library for date formatting,supports **ES6 Module** and **[node.js](https://nodejs.org/en)**.

# Features

- Support both **ES6 Module** environment and **[node.js](https://nodejs.org/en)** environment.
- Resolve to the corresponding date expression string or date object according to the format string.
- Support calculation of relative date.
- Support for custom week and month strings.
- Many date format characters complete your most complex formatting in the simplest way.
- Some practical date comparison functions are provided.

# Install

`npm`:

```js
 npm install date-fm --save
```

`yarn`:

```js
 yarn add date-fm
```

# Usage

### Using in Commonjs

#### Formate date

- The easiest way to use it is:

```js
const { format } = require('date-fm');
console.log(format()); // output is "2018-12-20 16:25:55",default to current date
```

- Customized use:

```js
const { format } = require('date-fm');
console.log(format('YYYY/MM/DD HH:II:SS aa', new Date(2018, 11, 20))); // output is "2018/12/20 00:00:00 am"
console.log(format('YY-mm-dd hh:ii:ss  WW')); // output is "19-12-25 23:23:59  Wednesday"
// locale config
console.log(
  format('YY/mm/dd hh:ii:ss NN WW', new Date(), {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    // Note : the first item in the array is Sunday!
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  }),
); // output is "19/12/25 23:23:59 Dec Wed"
```

#### Resolve relative date

```js
const {resolve,relative} = require("date-fm");
console.log(resolve("+3days4hours")); // output is "2019-12-20 20:25:55"
console.log(resolve("-3years2weeks","YYYY/MM/DD HH:II:SS aa")); // output is "2016/12/20 16:25:55 pm"
console.log(resolve("lastweek")); // output is "2019-12-13 16:25:55"
let date= resolve("yesterday",false); // return a native Date Object
console.log(relative(new Date(2017, 8, 24)));// output is "2 years ago"
let timestamp = Date.now();
console.log(relative(timestamp)));// output is "2 minutes ago"
```

#### Compare date

```js
const {
  isBefore,
  isAfter,
  isLeapYear,
  compare,
  isBetween,
} = require('date-fm');
console.log(isBefore(new Date(2017, 8, 24))); // output is "true"
console.log(isAfter(new Date(2017, 8, 24), new Date())); // output is "false"
console.log(isLeapYear(2082)); // output is "false"
console.log(compare(new Date(2017, 8, 24), new Date(2018, 8, 24))); // output is "-1"
console.log(
  isBetween(1577286966411, new Date(2016, 8, 24), new Date(2018, 8, 24)),
); // output is "false"
```

### Using in ES6 Module

If you want to use `date-fm` in other packaging based engineering projects, it's very simple. Just import it and use it

```js
import { format } from 'date-fm';
let sDate = format();
// ...
```

# Api

```js
const {
  compare,
  format,
  isAfter,
  isBefore,
  isBetween,
  isEqual,
  isLeapYear,
  relative,
  resolve,
} = require('date-fm');
// or
import {
  compare,
  format,
  isAfter,
  isBefore,
  isBetween,
  isEqual,
  isLeapYear,
  relative,
  resolve,
} from 'date-fm';
```

and then

### <span id= "formate">format(format?:String, time?:Date|Timestamp = new Date(),options?:{months?:String[],weekdays?:String[]}={}):String</span>

- **description** : Returns the corresponding format string according to the specified date format;
- **params** :  
   `format`:(String) format string,default to 'YYYY-MM-DD HH:II:SS'. see the following table for the [supported format symbols](#format).

  `time` :(Date|Number) Date object or timestamp to format,default to current time.

  `options`:(Object:{weekdays,months}) Optional,custom month and weekday configuration objects,default to {};

  `options.weekdays` :{Array} Array of custom weekdays,

  `options.months`: {Array} Array of custom months

The following table is <span id="format">**supported format symbols:**</span>

> **Note**:Sometimes the normal text we display may contain `date-fm` predefined format characters. At this time, `date-fm` will also convert these characters, which may not be what we want. So in order to ensure that predefined format characters do not conflict with ordinary text characters, our built-in predefined format characters are composed of two characters,as listed in the table below：

| symbol | description                                                                                          |
| ------ | ---------------------------------------------------------------------------------------------------- |
| YYYY   | 4-digit year,eg. '2018'                                                                              |
| YY     | 2-digit year,eg. '18'                                                                                |
| MM     | Month with leading 0,eg. '07'                                                                        |
| mm     | Months without leading 0,eg. '7'                                                                     |
| DD     | Date with leading 0,eg. '06'                                                                         |
| dd     | Date without leading 0,eg. '6'                                                                       |
| HH     | 24 hour system with leading 0,eg. '22'                                                               |
| hh     | 24 hour system without leading 0,eg. '8'                                                             |
| KK     | 12 hour system with leading 0,eg. '06'                                                               |
| kk     | 12 hour system without leading 0,eg. '6'                                                             |
| II     | Minutes with leading 0,eg. '09'                                                                      |
| ii     | Minutes without leading 0,eg. '9'                                                                    |
| SS     | Seconds with leading 0,eg. '01'                                                                      |
| ss     | Seconds without leading 0,eg. '1'                                                                    |
| aa     | lower afternoon sign in capital,eg. 'am','pm'                                                        |
| AA     | Upper afternoon sign in capital,eg. 'AM','PM'                                                        |
| jj     | Days of the current year,eg. 365 or 366                                                              |
| NN     | Complete spelling of English month names,eg.'December',can be overridden by custom `options.months`  |
| nn     | Abbreviation of English month name,eg. 'Dec',can be overridden by custom `options.months`            |
| WW     | Complete spelling of English week names ,eg. 'Sunday',can be overridden by custom `options.weekdays` |
| ww     | Abbreviation of English week name, eg. 'Sun' ,can be overridden by custom `options.weekdays`         |

- **returns**:(String) formated string

### isLeapYear(year:Number|String|Date)

- **description** : Decide if it's a leap year
- **params** :  
  `year`:(Number|String|Date)Accept a date object , a number representing the year or a string representing the year can be converted to Number
- **returns**:(Boolean) Return `true` if leap year, `false` otherwise

### isBefore(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine whether target precedes comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** (Boolean) If target returns `true` before comparator, `false` otherwise

### isAfter(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine whether target follows comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** :(Boolean) If target returns `true` after comparator, `false` otherwise

### isEqual(target:Date, comparator?:Date = new Date()):Boolean

- **description** : Determine if two dates are equal
- **params** :  
  `target`: (Date) Date to compare
  `comparator` : (Date) Date to be compared;default to current time
- **returns** :(Boolean) Return true if it is the same date, otherwise return false

### compare(target:Date, comparator?:Date = new Date()):Number

- **description** : Compare two dates.
- **params** :  
   `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns**:(Boolean) If target is larger than comparator, return 1, equal return 0, otherwise return - 1

### resolve(relative:String, format?:String|false = "YYYY/MM/DD HH:II:SS"):Date|String

- **description** : Resolve relative date
- **params** :
  `relative`:(String) The relative date mark such as '+3year4month' and the mark consists of `operator` and `token`:

  For example, in '+3year4month', '+' is called operator, 'year' and 'month' are valid tokens, and their combination represents a certain meaning.

supported operators are: `+` ,`-`;

supported tokens are: `year(s)`, `month(s)`, `week(s)` ,`day(s)`, `hour(s)`, `minute(s)`, `second(s)` ,`millisecond(s)`, `now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yesterday`, `tomorrow`, `today`;

> **Note:** The above token and operator represent a certain meaning. In order to meet the specific application, try **not to** mix the operator `+` or `-` with the following specific token:`now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yesterday`, `tomorrow`, `today`,this will cause parsing errors!

`format`:(String) format string ,type: `string`|`false`.see valid [format](#format) symbols above.

- **returns**: (Date|String) If `format` is set to `false`, it will return a parsed date object, otherwise it will return the format string of the parsed object!

### relative(date:Date|timestamp):String

- **description** : Calculates the specified date relative to the current time and return the corresponding string
- **params** :  
   `date`: (Date|timestamp)
- **returns** (String) relative string

### isBetween(target:Date|timestamp, start:Date|timestamp, end:Date|timestamp):Boolean

- **description** Judge whether the date is within the specified range
- **params**:

  `target`:(Date|Number) Date to judge

  `start`:(Date|Number) Start of date range

  `end`:(Date|Number) End of date range

- **returns**:(Boolean) Returns `true` if the specified date is in the range, `false` otherwise

# License

[MIT](https://mitlicense.org)
