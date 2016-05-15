import { flatten } from 'dummy/helpers/flatten';
import { module, test } from 'qunit';

module('Unit | Helper | flatten');

test('it flattens a single level array', function(assert) {
  let result = flatten([42, 10]);

  assert.deepEqual(result, [42, 10]);
});

test('it flattens a two-level array', function(assert) {
  let result = flatten([42, [10, 11]]);

  assert.deepEqual(result, [42, 10, 11]);
});

test('it flattens a three-level array', function(assert) {
  let result = flatten([42, [10, [11]]]);

  assert.deepEqual(result, [42, 10, 11]);
});
