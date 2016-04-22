import { previous } from 'dummy/helpers/previous';
import { module, test } from 'qunit';

module('Unit | Helper | previous');

test('it returns the current value if it is the first element in the array', function(assert) {
  let result = previous(1, [1, 2, 3, 4]);

  assert.equal(result, 1, 'should return 1');
});

test('it returns `null` if the given value is not in the array', function(assert) {
  let result = previous(5, [1, 2, 3, 4]);

  assert.equal(result, null, 'should return `null`');
});
