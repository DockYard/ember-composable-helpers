import { flatten } from 'dummy/helpers/flatten';
import { module, test } from 'qunit';

module('Unit | Helper | flatten');

test('it flattens arrays of arrays', function(assert) {
  let input = [1, [2, 3], [4, 5, [6]]];
  let expected = [1, 2, 3, 4, 5, 6];
  let result = flatten(input);

  assert.deepEqual(result, expected, 'it successfully flattens an array of arrays');
});

test('it returns an empty array when trying to flatten an empty array', function(assert) {
  let input = [];
  let expected = [];
  let result = flatten(input);

  assert.deepEqual(result, expected, 'it returns empty array when flattening empty array');
});

test('it returns an empty array when input is null or undefined', function(assert) {
  assert.deepEqual(flatten(null), [], 'it returns an empty array when input is string');
  assert.deepEqual(flatten(undefined), [], 'it returns an empty array when input is string');
});
