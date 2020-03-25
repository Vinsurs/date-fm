![npm](https://nodei.co/npm/date-fm.png?downloads=true&downloadRank=true)

# date-fm ![Build Status](https://secure.travis-ci.org/mongodb/node-mongodb-native.svg?branch=2.1) ![coverage status](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat) ![NPM version](https://badge.fury.io/js/date-fm.svg)

> `date-fm` is a JavaScript library for date formatting,supports **Browser** and **[node.js](https://nodejs.org/en)**.

# Install

with `npm`:

```js
 npm install date-fm --save
```

with `yarn`:

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
    ampm: ['am', 'pm'],
  }),
); // output is "19/12/25 23:23:59 Dec Wed"
```

#### Resolve relative date

```js
const {resolve,relative} = require("date-fm");
console.log(resolve("+3days4hours")); // output is "2019-12-20 20:25:55"
// abbreviation of "+3days4hours"
console.log(resolve("+3d4h")); // output is "2019-12-20 20:25:55"
console.log(resolve("-3years2weeks","YYYY/MM/DD HH:II:SS aa")); // output is "2016/12/20 16:25:55 pm"
console.log(resolve("lastweek")); // output is "2019-12-13 16:25:55"
let date= resolve("yesterday",false); // return a native Date Object
console.log(relative(new Date(2017, 8, 24)));// output is "2 years ago"
let timestamp = Date.now();
console.log(relative(timestamp)));// output is "a few seconds ago"
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

### Using in Browser

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./node_modules/date-fm/dist/date-fm.min.js"></script>
    <script>
      let format = dateFm.format(new Date(2015, 4, 20));
      // ...
    </script>
  </body>
</html>
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

### <span id= "formate">format(format?:string, time?:Date|number = new Date(),options?:{months?:string[],weekdays?:string[],ampm?:string[]}={}):string</span>

- **description** : Returns the corresponding format string according to the specified date format;
- **params** :  
   `format`:(string) format string,default to 'YYYY-MM-DD HH:II:SS'. see the following table for the [supported format symbols](#format).

  `time` :(Date|number) Date object or timestamp to format,default to current time.

  `options`:(Object:{weekdays,months,ampm}) Optional,custom month and weekday configuration objects,default to {};

  `options.weekdays` :{Array} Array of custom weekdays,

  `options.months`: {Array} Array of custom months

  `options.ampm`: {Array} Array of custom am and pm

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
| aa     | lower afternoon sign in capital,eg. 'am','pm',can be overridden by custom `options.ampm`             |
| AA     | Upper afternoon sign in capital,eg. 'AM','PM',can be overridden by custom `options.ampm`             |
| jj     | Days of the current year,eg. 365 or 366                                                              |
| NN     | Complete spelling of English month names,eg.'December',can be overridden by custom `options.months`  |
| nn     | Abbreviation of English month name,eg. 'Dec',can be overridden by custom `options.months`            |
| WW     | Complete spelling of English week names ,eg. 'Sunday',can be overridden by custom `options.weekdays` |
| ww     | Abbreviation of English week name, eg. 'Sun' ,can be overridden by custom `options.weekdays`         |

- **returns**:(string) formated string

### isLeapYear(year:number|string|Date)

- **description** : Decide if it's a leap year
- **params** :  
  `year`:(number|string|Date)Accept a date object , a number representing the year or a string representing the year can be converted to number
- **returns**:(boolean) Return `true` if leap year, `false` otherwise

### isBefore(target:Date, comparator?:Date = new Date()):boolean

- **description** : Determine whether target precedes comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** (boolean) If target returns `true` before comparator, `false` otherwise

### isAfter(target:Date, comparator?:Date = new Date()):boolean

- **description** : Determine whether target follows comparator
- **params** :  
  `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns** :(boolean) If target returns `true` after comparator, `false` otherwise

### isEqual(target:Date, comparator?:Date = new Date()):boolean

- **description** : Determine if two dates are equal
- **params** :  
  `target`: (Date) Date to compare
  `comparator` : (Date) Date to be compared;default to current time
- **returns** :(boolean) Return true if it is the same date, otherwise return false

### compare(target:Date, comparator?:Date = new Date()):number

- **description** : Compare two dates.
- **params** :  
   `target`: (Date) Date to compare

  `comparator` : (Date) Date to be compared;default to current time

- **returns**:(boolean) If target is larger than comparator, return 1, equal return 0, otherwise return - 1

### resolve(relative:string, format?:string|false = "YYYY/MM/DD HH:II:SS"):Date|string

- **description** : Resolve relative date
- **params** :
  `relative`:(string) The relative date mark such as '+3year4month' and the mark consists of `operator` and `token`:

  For example, in '+3year4month', '+' is called operator, 'year' and 'month' are valid tokens, and their combination represents a certain meaning.

supported operators are: `+` ,`-`;

supported tokens are: `year(s)`, `month(s)`, `week(s)` ,`day(s)`, `hour(s)`, `minute(s)`, `second(s)` ,`millisecond(s)`, `now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yesterday`, `tomorrow`, `today`;
abbreviations:`year(s)`->`y`, `month(s)`->`m`, `week(s)`->`w` ,`day(s)`->`d`, `hour(s)`->`h`, `minute(s)`->`i`, `second(s)`->`s` ,`millisecond(s)`->`ms`,so the following is equivalent:

```js
resolve('+3days4hours');
// or
resolve('+3d4h');
```

> **Note:** The above token and operator represent a certain meaning. In order to meet the specific application, try **not to** mix the operator `+` or `-` with the following specific token:`now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yesterday`, `tomorrow`, `today`,this will cause parsing errors!

`format`:(string) format string ,type: `string`|`false`.see valid [format](#format) symbols above.

- **returns**: (Date|string) If `format` is set to `false`, it will return a parsed date object, otherwise it will return the format string of the parsed object!

### relative(date:Date|number):String

- **description** : Calculates the specified date relative to the current time and return the corresponding string
- **params** :  
   `date`: (Date|number) date object or timestamp number
- **returns** (string) relative string

### isBetween(target:Date|number, start:Date|number, end:Date|number):Boolean

- **description** Judge whether the date is within the specified range
- **params**:

  `target`:(Date|number) Date to judge,can be date object or timestamp number

  `start`:(Date|number) Start of date range,can be date object or timestamp number

  `end`:(Date|number) End of date range,can be date object or timestamp number

- **returns**:(boolean) Returns `true` if the specified date is in the range, `false` otherwise
