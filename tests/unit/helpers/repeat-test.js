import { repeat } from 'dummy/helpers/repeat';
import { module, test } from 'qunit';

module('Unit | Helper | repeat');

test('it repeats `n` times', function(assert) {
  let expectedResult = [undefined, undefined, undefined];
  let result = repeat([3]);

  assert.deepEqual(expectedResult, result, 'should return an array of `undefined` values');
});

test('it repeats `n` times with a value', function(assert) {
  let expectedResult = ['foo', 'foo', 'foo'];
  let result = repeat([3, 'foo']);

  assert.deepEqual(expectedResult, result, 'should return an array of "foo" values');
});
