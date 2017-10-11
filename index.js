/**
 * Returns an Array of start and end day pairs in order for each month
 * between start and end inclusive.
 *
 * @param  {Date} start Start date of the range
 * @param  {Date} end   End date of the range
 * @return {Array<Array<Integer>} Start and end day pairs in order.
 */
const monthEnds = module.exports = function (start, end) {
  const range = [[firstDayOfMonth(start), lastDayOfMonth(start)]];
  const max = {
    year: end.getUTCFullYear(),
    month: end.getUTCMonth(),
    day: end.getUTCDate()
  };

  let next = firstDayOfNextMonth(start);
  while (lteDayOfYear(next, max)) {
    range.push([next, lastDayOfMonth(next)]);
    next = firstDayOfNextMonth(next);
  }

  return range;
};

/**
 * Returns a value indicating if the target date is less than or equal to
 * the max date in only year, month, & day of month. Hours, minutes,
 * and seconds are ignored.
 * @param  {Date} date Calendar date to compare to max
 * @param  {Array} max { year: getUTCFullYear(), month: getUTCMonth(), day: getUTCDate() }
 * @return {Boolean} Value indicating if date <= max ignoring time.
 */
function lteDayOfYear(date, max) {
  const actual = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate()
  };

  if (actual.year < max.year) return true;
  if (actual.month > max.month) return false;
  if (actual.day > max.day) return false;

  return true;
}

/**
 * Returns the last day of the month for the month `date` occurs in.
 * @param  {Date} date Calendar date to get last day of month for
 * @return {Date} Last day of the month that `date` occurs in.
 */
function lastDayOfMonth(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
}

/**
 * Returns the first day of the month for the month `date` occurs in.
 * @param  {Date} date Calendar date to get first day of month for
 * @return {Date} First day of the month that `date` occurs in.
 */
function firstDayOfMonth(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
}

/**
 * Returns the first day of the month following the month `date` occurs in.
 * @param  {Date} date Calendar date to get first day of next month for.
 * @return {Date} First day of the month after that which `date` occurs in.
 */
function firstDayOfNextMonth(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
}

//
// Hoist helpers for testability
//
monthEnds.lastDayOfMonth = lastDayOfMonth;
monthEnds.firstDayOfMonth = firstDayOfMonth;
monthEnds.firstDayOfNextMonth = firstDayOfNextMonth;
