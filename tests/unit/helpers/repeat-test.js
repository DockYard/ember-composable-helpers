import { repeat } from 'dummy/helpers/repeat';
import { module, test } from 'qunit';

module('Unit | Helper | repeat');

test('it repeats `n` times', function(assert) {
  let expectedResult = [undefined, undefined, undefined];
  let result = repeat([3]);

  assert.deepEqual(result, expectedResult, 'should return an array of `undefined` values');
});

test('it repeats `n` times with a value', function(assert) {
  let expectedResult = ['foo', 'foo', 'foo'];
  let result = repeat([3, 'foo']);

  assert.deepEqual(result, expectedResult, 'should return an array of "foo" values');
});

test('it handles non-number length', function(assert) {
  let expectedResult = [undefined];
  let result = repeat(['foo']);

  assert.deepEqual(result, expectedResult, 'should return array containing non-number length');
});
