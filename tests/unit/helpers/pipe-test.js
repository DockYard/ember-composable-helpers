import { pipe } from 'dummy/helpers/pipe';
import { module, test } from 'qunit';

module('Unit | Helper | pipe');

function add(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

function subtract(x, y) {
  if (typeof y === 'undefined') {
    throw new Error('2nd argument is undefined');
  }
  return x - y;
}

test('it pipes functions together', function(assert) {
  let piped = pipe([add, square, Math.sqrt]);
  let result = piped(2, 4);

  assert.equal(result, 6, 'it pipes functions together');
});

test('first function is variadic, rest are unary', function(assert) {
  let piped = pipe([add, square, Math.sqrt, subtract]);

  assert.throws(() => piped(2, 4), 'should throw an error');
});
