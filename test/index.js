const assert = require("assert");
const formate = require("../src/index");
describe("date-fm can be run", function() {
  describe("formate api", function() {
    it("format equals to formate.format", function() {
      assert.equal(formate(), formate.format());
    });
    it("formate", function() {
      assert.strictEqual(formate("YYYY-MM-DD WW"), "2020-02-05 Wednesday");
    });
    it("formate with customize", function() {
      assert.strictEqual(
        formate("YYYY-MM-DD WW", Date.now(), {
          weekdays: [
            "星期天",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
          ]
        }),
        "2020-02-05 星期三"
      );
    });
    it("formate.format", function() {
      assert.deepEqual(
        formate.format("YYYY/MM/DD HH:II:SS aa", new Date(2018, 11, 20)),
        "2018/12/20 00:00:00 am"
      );
    });
    it("uncorrect params", function() {
      assert.throws(function() {
        formate.format(123);
      });
    });
  });
  describe("resolve api", function() {
    it("resolve with oparator", function() {
      assert.strictEqual(
        formate.resolve("+3days4hours", "YYYY-MM-DD HH"),
        "2020-02-08 23"
      );
    });
    it("resolve with symbol", function() {
      assert.strictEqual(
        formate.resolve("yesterday", "YYYY-MM-DD HH:II:SS"),
        "2020-02-04 00:00:00"
      );
    });
    it("resolve with format param to false", function() {
      assert.strictEqual(formate.resolve("now", false).getTime(), Date.now());
    });
    it("resolve with uncorrect param", function() {
      assert.throws(function() {
        formate.resolve("tomorrow", 255);
      });
    });
  });
  describe("relative api", function() {
    it("relative date", function() {
      assert.equal(formate.relative(new Date(2017, 8, 24)), "2 years ago");
    });
    it("uncorrect param", function() {
      assert.throws(function() {
        formate.relative("abc");
      });
    });
  });
  describe("compare api", function() {
    it("uncorrect param-before", function() {
      assert.throws(function() {
        formate.isBefore();
      });
    });
    it("before", function() {
      assert.equal(formate.isBefore(new Date(2017, 8, 24)), true);
    });
    it("after", function() {
      assert.equal(formate.isAfter(new Date(2017, 8, 24), new Date()), false);
    });
    it("leapyear", function() {
      assert.deepEqual(formate.isLeapYear(2082), false);
    });
    it("uncorrect param-compare", function() {
      assert.throws(function() {
        formate.compare();
      });
    });
    it("compare", function() {
      assert.deepEqual(
        formate.compare(new Date(2017, 8, 24), new Date(2018, 8, 24)),
        -1
      );
    });
    it("between", function() {
      assert.deepEqual(
        formate.isBetween(
          1577286966411,
          new Date(2016, 8, 24),
          new Date(2018, 8, 24)
        ),
        false
      );
    });
    it("uncorrect param-between", function() {
      assert.throws(function() {
        formate.isBetween();
      });
    });
  });
});
