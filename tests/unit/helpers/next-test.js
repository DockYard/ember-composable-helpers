import { next } from 'dummy/helpers/next';
import { module, test } from 'qunit';

module('Unit | Helper | next');

test('it returns the current value if it is the last element in the array', function(assert) {
  let result = next(4, [1, 2, 3, 4]);

  assert.equal(result, 4, 'should return 4');
});

test('it returns `null` if the given value is not in the array', function(assert) {
  let result = next(5, [1, 2, 3, 4]);

  assert.equal(result, null, 'should return `null`');
});
