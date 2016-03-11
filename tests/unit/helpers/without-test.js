import { without } from 'dummy/helpers/without';
import { module, test } from 'qunit';

module('Unit | Helper | without');

test('it returns the array with the given value ommitted', function(assert) {
  let expectedResult = [42, 56];
  let result = without(78, [42, 56, 78]);

  assert.deepEqual(result, expectedResult, 'should return the remaining values');
});

test('it returns the array with the given values ommitted', function(assert) {
  let expectedResult = [78];
  let result = without([42, 56], [42, 56, 78]);

  assert.deepEqual(result, expectedResult, 'should return the remaining values');
});

test('it returns the same array when no values are ommitted', function(assert) {
  let expectedResult = [42, 56, 78];
  let result = without('foo', [42, 56, 78]);

  assert.deepEqual(result, expectedResult, 'should return the same array');
});
