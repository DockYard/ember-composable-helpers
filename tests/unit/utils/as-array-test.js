import asArray from 'ember-composable-helpers/utils/as-array';
import { module, test } from 'qunit';

module('Unit | Utility | as-array', function() {

  test('it works for [undefined]', function(assert) {
    let result = asArray();
    assert.equal(result.length, 0);
  });

  test('it works for [null]', function(assert) {
    let result = asArray(null);
    assert.equal(result.length, 0);
  });

  test('it works for [Set]', function(assert) {
    let result = asArray(new Set([1,2,3]));
    assert.equal(result.length, 3);
  });

  test('it works for [Map]', function(assert) {
    let map = new Map();
    map.set(1,1);
    map.set(2,1);
    map.set(3,1);
    let result = asArray(map);
    assert.equal(result.length, 3);
  });

  test('it works for [Object]', function(assert) {
    let result = asArray({a:1,b:2,c:3});
    assert.equal(result.length, 3);
  });

  test('it works for [Strings]', function(assert) {
    let result = asArray('abc');
    assert.equal(result.length, 3);
  });

  test('it not works for number', function(assert) {
    try {
      asArray(1);
    } catch (e) {
      assert.ok(e.toString().includes('not supported'));
    }
  });

  test('it not works for non-iterable items', function(assert) {
    try {
      asArray(Symbol('a'));
    } catch (e) {
      assert.ok(e.toString().includes('not iterable'));
    }
  });
});
