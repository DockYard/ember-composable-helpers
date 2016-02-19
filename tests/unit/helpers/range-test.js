import { range } from 'dummy/helpers/range';
import { module, test } from 'qunit';

module('Unit | Helper | range');

test('it generates a range', function(assert) {
  let expectedResult1 = [1, 2, 3, 4];
  let expectedResult2 = [10, 11, 12, 13, 14];
  let expectedResult3 = [-1, 0, 1];
  let result1 = range([1, 5]);
  let result2 = range([10, 15]);
  let result3 = range([-1, 2]);

  assert.deepEqual(result1, expectedResult1, 'should generate 1 to 4');
  assert.deepEqual(result2, expectedResult2, 'should generate 10 to 14');
  assert.deepEqual(result3, expectedResult3, 'should generate -1 to 1');
});

test('it generates a negative range', function(assert) {
  let expectedResult = [5, 4, 3, 2, 1];
  let result = range([5, 0]);

  assert.deepEqual(result, expectedResult, 'should generate 5 to 1');
});

test('it generates an inclusive range', function(assert) {
  let expectedResult = [1, 2, 3, 4, 5];
  let result = range([1, 5, true]);

  assert.deepEqual(result, expectedResult, 'should generate 1 to 5 inclusive');
});

test('it generates an inclusive negative range', function(assert) {
  let expectedResult = [5, 4, 3, 2, 1, 0];
  let result = range([5, 0, true]);

  assert.deepEqual(result, expectedResult, 'should generate 5 to 0 inclusive');
});
