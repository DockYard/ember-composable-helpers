import { chunk } from 'dummy/helpers/chunk';
import { module, test } from 'qunit';

module('Unit | Helper | chunk');

test('it chunks an empty array', function(assert) {
  let expectedResult = [];
  let result = chunk([], 2);

  assert.deepEqual(result, expectedResult, 'should return empty array');
});

test('it chunks an array into 0 parts', function(assert) {
  let expectedResult = [];
  let result = chunk([1, 2, 3], 0);

  assert.deepEqual(result, expectedResult, 'should return empty array');
});

test('it chunks an array into negative parts', function(assert) {
  let expectedResult = [];
  let result = chunk([1, 2, 3], -1);

  assert.deepEqual(result, expectedResult, 'should return empty array');
});

test('it chunks an array into parts of 1', function(assert) {
  let expectedResult = [[1], [2], [3]];
  let result = chunk([1, 2, 3], 1);

  assert.deepEqual(result, expectedResult, 'should return three chunked arrays');
});

test('it chunks an array into parts of current array length', function(assert) {
  let expectedResult = [[1, 2, 3]];
  let result = chunk([1, 2, 3], 3);

  assert.deepEqual(result, expectedResult, 'should return a nested array');
});

test('it chunks an array into parts of more than the current array length', function(assert) {
  let expectedResult = [[1, 2, 3]];
  let result = chunk([1, 2, 3], 5);

  assert.deepEqual(result, expectedResult, 'should return a nested array');
});

test('it chunks an array into parts of less than current array length', function(assert) {
  let expectedResult1 = [[10, 20], [30, 40], [50, 60], [70]];
  let expectedResult2 = [[10, 20, 30], [40, 50, 60], [70]];
  let result1 = chunk([10, 20, 30, 40, 50, 60, 70], 2);
  let result2 = chunk([10, 20, 30, 40, 50, 60, 70], 3);

  assert.deepEqual(result1, expectedResult1, 'should return array of chunked arrays');
  assert.deepEqual(result2, expectedResult2, 'should return array of chunked arrays');
});
