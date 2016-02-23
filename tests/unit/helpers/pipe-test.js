import { pipe } from 'dummy/helpers/pipe';
import { module, test } from 'qunit';

module('Unit | Helper | pipe');

function add(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

function thinger() {
  return undefined;
}

function countArgs(...args) {
  return args.length;
}

test('it pipes functions together', function(assert) {
  let piped = pipe([add, square, Math.sqrt]);
  let result = piped(2, 4);

  assert.equal(result, 6, 'it pipes functions together');
});

test('first function is variadic, rest are unary', function(assert) {
  let piped = pipe([add, square, Math.sqrt, thinger, countArgs]);
  let result = piped(2, 4);

  assert.equal(result, 1, 'should receive 1 arg for last function');
});
