import { array } from 'dummy/helpers/array';
import { module, test } from 'qunit';

module('Unit | Helper | array');

test('it works', function(assert) {
  let result = array([42]);
  assert.ok(result);
});

test('collects multiple parameters into an array', function(assert) {
  assert.deepEqual(array([1, 2, 3]), [1, 2, 3], 'collects values into array');
  assert.deepEqual(array([2, null, 7]), [2, null, 7], 'accepts null values');
  assert.deepEqual(array([2, 5, undefined]), [2, 5, undefined], 'accepts undefined values');
});

test('if no parameters are given, it returns an empty array', function(assert) {
  assert.deepEqual(array(), []);
});
