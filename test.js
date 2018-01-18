const assume = require('assume');
const debug = require('diagnostics')('month-ends');
const monthEnds = require('./');

const { lastDayOfMonth, firstDayOfMonth, firstDayOfNextMonth } = monthEnds;

function assumeIsDate(date, ...expected) {
  const [year, month, day] = expected;

  debug('Compare dates', `${year}/${month}/${day}`, date);
  assume(year).equals(date.getUTCFullYear());
  assume(month).equals(date.getUTCMonth() + 1);
  assume(day).equals(date.getUTCDate());
}

describe('month-ends', function () {
  describe('monthEnds', function () {
    it('generates a single month range', function () {
      const start = new Date('2015-01-02');
      assumeIsDate(start, 2015, 01, 02);

      const end = new Date('2015-01-20');
      assumeIsDate(end, 2015, 01, 20);

      const range = monthEnds(start, end);

      assume(range).is.an('array');
      assume(range.length).equals(1);
      assume(range[0]).is.an('array');

      const [expectedStart, expectedEnd] = range[0];
      assumeIsDate(expectedStart, 2015, 01, 01);
      assumeIsDate(expectedEnd, 2015, 01, 31);
    });

    it('generates a single month range from exact start & end', function () {
      const start = new Date('2017-12-01T00:00:00.000Z');
      assumeIsDate(start, 2017, 12, 01);

      const end = new Date('2017-12-31T00:00:00.000Z');
      assumeIsDate(end, 2017, 12, 31);

      const range = monthEnds(start, end);

      assume(range).is.an('array');
      assume(range.length).equals(1);
      assume(range[0]).is.an('array');

      const [expectedStart, expectedEnd] = range[0];
      assumeIsDate(expectedStart, 2017, 12, 01);
      assumeIsDate(expectedEnd, 2017, 12, 31);
    });

    it('generates ranges with a single year', function () {
      const start = new Date('2015-01-02');
      assumeIsDate(start, 2015, 01, 02);

      const end = new Date('2015-06-20');
      assumeIsDate(end, 2015, 06, 20);

      const range = monthEnds(start, end);

      assume(range).is.an('array');
      assume(range.length).equals(6);

      assume(range[0]).is.an('array');
      assume(range[1]).is.an('array');
      assume(range[2]).is.an('array');
      assume(range[3]).is.an('array');
      assume(range[4]).is.an('array');
      assume(range[5]).is.an('array');

      const [marStart, marEnd] = range[2];
      assumeIsDate(marStart, 2015, 03, 01);
      assumeIsDate(marEnd, 2015, 03, 31);

      const [junStart, junEnd] = range[5];
      assumeIsDate(junStart, 2015, 06, 01);
      assumeIsDate(junEnd, 2015, 06, 30);
    });

    it('generates ranges across years', function () {
      const start = new Date('2015-11-06');
      assumeIsDate(start, 2015, 11, 06);

      const end = new Date('2016-01-01');
      assumeIsDate(end, 2016, 01, 01);

      const range = monthEnds(start, end);

      assume(range).is.an('array');
      assume(range.length).equals(3);

      assume(range[0]).is.an('array');
      assume(range[1]).is.an('array');
      assume(range[2]).is.an('array');

      const [novStart, novEnd] = range[0];
      assumeIsDate(novStart, 2015, 11, 01);
      assumeIsDate(novEnd, 2015, 11, 30);

      const [janStart, janEnd] = range[2];
      assumeIsDate(janStart, 2016, 01, 01);
      assumeIsDate(janEnd, 2016, 01, 31);
    });
  });

  describe('lastDayOfMonth', function () {
    it('rounds up', function () {
      const input = new Date('2015-01-20');
      assumeIsDate(input, 2015, 01, 20);

      const last = monthEnds.lastDayOfMonth(input);
      assumeIsDate(last, 2015, 01, 31);
    });

    it('does not round over', function () {
      const input = new Date('2016-12-31');
      assumeIsDate(input, 2016, 12, 31);

      const last = monthEnds.lastDayOfMonth(input);
      assumeIsDate(last, 2016, 12, 31);
    });
  });

  describe('firstDayOfMonth', function () {
    it('rounds down', function () {
      const input = new Date('2015-01-20');
      assumeIsDate(input, 2015, 01, 20);

      const last = monthEnds.firstDayOfMonth(input);
      assumeIsDate(last, 2015, 01, 01);
    });

    it('does not round under', function () {
      const input = new Date('2016-12-01');
      assumeIsDate(input, 2016, 12, 01);

      const last = monthEnds.firstDayOfMonth(input);
      assumeIsDate(last, 2016, 12, 01);
    });
  });

  describe('firstDayOfNextMonth', function () {
    it('rounds up', function () {
      const input = new Date('2015-01-20');
      assumeIsDate(input, 2015, 01, 20);

      const last = monthEnds.firstDayOfNextMonth(input);
      assumeIsDate(last, 2015, 02, 01);
    });

    it('does not over round at boundaries (last day)', function () {
      const input = new Date('2016-11-30');
      assumeIsDate(input, 2016, 11, 30);

      const last = monthEnds.firstDayOfNextMonth(input);
      assumeIsDate(last, 2016, 12, 01);
    });

    it('does not over round at boundaries (first day)', function () {
      const input = new Date('2016-11-01');
      assumeIsDate(input, 2016, 11, 01);

      const last = monthEnds.firstDayOfNextMonth(input);
      assumeIsDate(last, 2016, 12, 01);
    });

    it('rounds over year boundaries', function () {
      const input = new Date('2016-12-01');
      assumeIsDate(input, 2016, 12, 01);

      const last = monthEnds.firstDayOfNextMonth(input);
      assumeIsDate(last, 2017, 01, 01);
    });
  });
});
