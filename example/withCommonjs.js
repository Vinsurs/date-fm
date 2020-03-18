const {
  format,
  resolve,
  relative,
  isBefore,
  isLeapYear,
  compare,
  isBetween,
} = require('../dist/date-fm.min.js');
// const formate = require("../src/index");
console.log(resolve('tomorrow'));
console.log(resolve('lastweek'));
console.log(relative(new Date()));
console.log(isBefore(new Date(2017, 8, 24)));
console.log(
  isBetween(1577286966411, new Date(2016, 8, 24), new Date(2018, 8, 24)),
);
console.log(isLeapYear(2082));
console.log(compare(new Date(2017, 8, 24), new Date(2018, 8, 24)));
console.log(
  format('YY/mm/dd hh:ii:ss NN WW', new Date(), {
    months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  }),
);
