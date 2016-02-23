import { contains } from 'dummy/helpers/contains';
import { module, test } from 'qunit';

module('Unit | Helper | contains');

test('it returns `true` if the array contains the given value', function(assert) {
  let result = contains(78, [42, 56, 78]);

  assert.ok(result, 'should return `true`');
});

test('it returns `true` if the array contains all values in the sub-array', function(assert) {
  let result = contains([56], [42, 56, 78]);

  assert.ok(result, 'should return `true`');
});

test('it returns `false` if the array does not contain all values in the sub-array', function(assert) {
  let result = contains([56, 12], [42, 56, 78]);

  assert.notOk(result, 'should return `false`');
});

test('it works with non-primitive values', function(assert) {
  let a = { id: 'a' };
  let b = ['b'];
  let c = { id: 'c' };
  let d = ['d'];

  assert.ok(contains([a], [a, b, c]), 'should return `true`');
  assert.notOk(contains([a, d], [a, b, c]), 'should return `false`');
  assert.notOk(contains([a, d], [a, a, a]), 'should return `false`');
});
