# month-ends

Purposefully simple and dependency free functions for calendar months

## Usage

#### `monthEnds`
``` js
const monthEnds = require('month-ends');

const start = new Date('2015-01-02');
const end = new Date('2015-04-12');

console.dir(monthEnds(start, end));
// [ [ 2015-01-01T05:00:00.000Z, 2015-01-31T05:00:00.000Z ],
//  [ 2015-02-01T05:00:00.000Z, 2015-02-28T05:00:00.000Z ],
//  [ 2015-03-01T05:00:00.000Z, 2015-03-31T04:00:00.000Z ],
//  [ 2015-04-01T04:00:00.000Z, 2015-04-30T04:00:00.000Z ] ]
```

#### `lastDayOfMonth`
``` js
const { lastDayOfMonth } = require('month-ends');

let anyDay = new Date('2015-06-07');
let end = lastDayOfMonth(anyDay);
console.dir(end.toDateString());
// 'Tue Jun 30 2015'
```

#### `firstDayOfMonth`
``` js
const { firstDayOfMonth } = require('month-ends');

let anyDay = new Date('2015-06-07');
let end = firstDayOfMonth(anyDay);
console.dir(end.toDateString());
// 'Mon Jun 01 2015'
```

#### `firstDayOfNextMonth`
``` js
const { firstDayOfNextMonth } = require('month-ends');

let anyDay = new Date('2015-06-07');
let end = firstDayOfNextMonth(anyDay);
console.dir(end.toDateString());
// 'Wed Jul 01 2015'
```

## Tests

Tests are written with `mocha`, `assume`, and `nyc`. They can be run with 
`npm`:

``` sh
npm test

// ...
// ...
// ...

  11 passing (25ms)

----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |    95.45 |    83.33 |      100 |      100 |                |
 index.js |    95.45 |    83.33 |      100 |      100 |             43 |
----------|----------|----------|----------|----------|----------------|
```

##### AUTHOR: [Charlie Robbins](https://github.com/indexzero)
##### LICENSE: MIT
