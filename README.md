# Table of contents

- [What is 'date-fm'](#desc)
- [Motivation](#motivation)
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Api](#api)
- [Parsing strings to Date](#parsestr)

# <span id="desc">What is 'date-fm'</span>

`date-fm`= **data**-**f**ormate-**m**ini, it is a JavaScript library for date formatting,and attempts to achieve more complex and frequent business requirements with smaller code size and more streamlined function functions

# <span id="motivation">Motivation</span>

With the frequent use of the date manipulation business in everyday coding, numerous libraries for formatting dates in JavaScript have been published on the market. So why do we need date-fm? Is known, the date in the JavaScript in the business operation and its frequent, but we in the use of other libraries operation when I was a bit annoying thing, that is some library is relatively larger size, and our business needs may be just for a date format just a matter of simple, but, the size of the introduced package is usually large, which will cause additional overhead to the performance of our project, which should be avoided as much as possible. Although some packages are small under the processing of building tools such as [webpack](https://webpack.github.io/), we don't need functions or functions that are not used in some packages.Therefore, we try to use the most concise syntax and the smallest code volume in this library to achieve the basic formatting function frequently used in business, and we will eliminate some functions that are not widely used to achieve the minimum code size.

# <span id="features">Features</span>

- **Smaller** size and more **powerful**. Under the premise of realizing specific and complex functions, the number of simplified functions should be controlled as much as possible to reduce the code size.
- Support both **browser** environment and **[node.js](https://nodejs.org/en)** environment.
- Simple API can help you achieve basic functions and improve your development efficiency.

# <span id="install">Install</span>

`npm`:

```js
 npm install date-fm --save
```

`bower`:

```js
 bower install date-fm
```

`yarn`:

```js
 yarn add date-fm
```

# <span id="usage">Usage</span>

'date-fm' supports Commonjs, AMD and Browser side. You can use it according to different environments.

### Commonjs

1.  Formate date

    - The easiest way to use it is:

      ```js
      const formate = require("date-fm");
      console.log(formate()); // output is "2018-12-20 16:25:55",depends on current date
      // alias to `formate`
      console.log(formate.format()); // output is "2018-12-20 16:25:55",depends on current date
      ```

    - Customized use:

      ```js
      const formate = require("date-fm");
      console.log(formate("YYYY/MM/DD HH:II:SS a", new Date(2018, 12, 20))); // output is "2018/12/20 00:00:00 am"
      // alias to `formate`
      console.log(
        formate.format("YYYY/MM/DD HH:II:SS a", new Date(2018, 12, 20))
      ); // output is "2018/12/20 00:00:00 am"
      ```

2.  Resolve relative date

        ```js
        const formate = require("date-fm");
        console.log(formate.resolve("+3days4hours")); // output is "2019-12-20 20:25:55"
        console.log(formate.resolve("-3years2weeks","YYYY/MM/DD HH:II:SS a")); // output is "2016/12/20 16:25:55 pm"
        console.log(formate.resolve("lastweek")); // output is "2019-12-13 16:25:55"
        let date= formate.resolve("lastweek",false); // return a native Date Object
        console.log(formate.relative(new Date(2017, 8, 24)));// output is "2 years ago"
        let timestamp = Date.now();
        console.log(formate.relative(timestamp)));// output is "2 minutes ago"
        ```

3.  Compare date

        ```js
        const formate = require("date-fm");
        console.log(formate.isBefore(new Date(2017, 8, 24))); // output is "true"
        console.log(formate.isAfter(new Date(2017, 8, 24), new Date())); // output is "false"
        console.log(formate.isLeapYear(2082)); // output is "false"
        console.log(formate.compare(new Date(2017, 8, 24), new Date(2018, 8, 24))); // output is "-1"
        ```

### Browser

The easiest way to use it in a browser is to introduce script tags, this exposes a `dateFm` object globally:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script src="./node_modules/dist/date-fm.js"></script>
    <script>
      // window.dateFm is the date formator
      let date = window.dateFm.resolve("tomorrow", false); // return a native Date Object
      // todo...
    </script>
  </body>
</html>
```

### Other

If you want to use `date-fm` in other packaging based engineering projects, it's very simple. Just import it and use it

```js
import formate from "date-fm";
let sDate = formate.format();
// ...
```

# <span id="api">Api</span>

Let's call the date format object exposed by [date-fm](https://www.npmjs.com/package/date-fm) `formate`, and then

#### <span id= "formate">formate(format?:String, time?:Date|Timestamp = new Date()):String</span>

- **action** : Returns the corresponding format string according to the specified date format;
- **params** :  
   `format`: format string,default to 'YYYY-MM-DD HH:II:SS'. see the following table for the [supported format symbols](#format).

  `time` : Date object or timestamp to format,default to current time.

The following table is <span id="format">**supported format characters:**</span>

| symbol | description                                   |
| ------ | --------------------------------------------- |
| YYYY   | 4-digit year,e.g '2018'                       |
| YY     | 2-digit year,e.g '18'                         |
| MM     | Month with leading 0,e.g '07'                 |
| mm     | Months without leading 0,e.g '7'              |
| DD     | Date with leading 0,e.g '06'                  |
| dd     | Date without leading 0,e.g '6'                |
| HH     | 24 hour system with leading 0,e.g '22'        |
| hh     | 24 hour system without leading 0,e.g '8'      |
| KK     | 12 hour system with leading 0,e.g '06'        |
| kk     | 12 hour system without leading 0,e.g '6'      |
| II     | Minutes with leading 0,e.g '09'               |
| ii     | Minutes without leading 0,e.g '9'             |
| SS     | Seconds with leading 0,e.g '01'               |
| ss     | Seconds without leading 0,e.g '1'             |
| a      | lower afternoon sign in capital,e.g 'am','pm' |
| A      | Upper afternoon sign in capital,e.g 'AM','PM' |

#### formate.format(format?:String, date?:Date|Timestamp = new Date()):String

- **action** : The alias of [formate](#formate) above.

#### formate.isLeapYear(year:Number|String|Date)

- **action** : Decide if it's a leap year
- **params** :  
  `year`:Accept a date object , a number representing the year or a string representing the year can be converted to Number

#### formate.isBefore(date1:Date, date2?:Date = new Date()):Boolean

- **action** : Determine whether date1 precedes date2
- **params** :  
  `date1`: Date Object

  `date2` : Date object

#### formate.isAfter(date1:Date, date2?:Date = new Date()):Boolean

- **action** : Determine whether date1 follows date2
- **params** :  
  `date1`: Date Object

  `date2` : Date object

#### formate.isEqual(date1:Date, date2?:Date = new Date()):Boolean

- **action** : Determine if two dates are equal
- **params** :  
  `date1`: Date Object
  `date2` : Date object

#### formate.compare(date1:Date, date2?:Date = new Date()):Number

- **action** : Compare two dates. If date1 is larger than date2, return 1, equal return 0, otherwise return - 1
- **params** :  
   `date1`: Date Object

  `date2` : Date object

#### formate.resolve(relative:String, format?:String|false = "YYYY-MM-DD HH:II:SS"):Date|String

- **action** : Resolve relative date
- **params** :
  `relative`: The relative date mark such as '+3year4month' and the mark consists of `operator` and `token`:

  For example, in '+3year4month', '+' is called operator, 'year' and 'month' are valid tokens, and their combination represents a certain meaning.

supported operators are: `+(add)` ,`-(sub)`

supported tokens are: `year(s)`, `month(s)`, `day(s)`, `week(s)` ,`hour(s)`, `minute(s)`, `second(s)` ,`millisecond(s)`, `now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yestoday`, `tomorrow`, `today`;

> **Note:** The above token and operator represent a certain meaning. In order to meet the specific application, try **not to** mix the operator `+` or `-` with the following specific token:`now` ,`lastweek` ,`lastyear`, `lastmonth` ,`yestoday`, `tomorrow`, `today`,this will cause parsing errors!

`format`:format string ,type: `string`|`false`.see valid [format](#format) symbols above.

> **Note**: If format is set to `false`, it will return a parsed date object, otherwise it will return the format string of the parsed object!

#### formate.relative(date:Date|timestamp):String

- **action** : Calculates the specified date relative to the current time and return the corresponding string
- **params** :  
   `date`: Date|timestamp

# <span id="parsestr">Parsing strings to Date</span>

Considering that parsing date format strings into date objects is only a small requirement and easy to implement,the date-fm library does **not support** this function, but if you're looking for anything more sophisticated than that you should probably look for a better library ([momentjs](https://momentjs.com) does pretty much everything).
