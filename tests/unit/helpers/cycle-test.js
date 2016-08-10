import { cycle } from 'dummy/helpers/cycle';
import { module, test } from 'qunit';

module('Unit | Helper | cycle');

test('it returns the first value if it is currently the last element in the array', function(assert) {
  let result = cycle(4, [1, 2, 3, 4]);

  assert.equal(result, 1, 'should return 1');
});

test('it returns `null` if the given value is not in the array', function(assert) {
  let result = cycle(5, [1, 2, 3, 4]);

  assert.equal(result, null, 'should return `null`');
});
