import asArray from 'ember-composable-helpers/utils/as-array';
import { module, test } from 'qunit';
import EmberObject from '@ember/object';

module('Unit | Utility | as-array', function () {

  test('it works for [undefined]', function (assert) {
    let result = asArray();
    assert.equal(result.length, 0);
  });

  test('it works for [null]', function (assert) {
    let result = asArray(null);
    assert.equal(result.length, 0);
  });

  test('it works for [Set]', function (assert) {
    let result = asArray(new Set([1, 2, 3]));
    assert.equal(result.length, 3);
  });

  test('it works for [Map]', function (assert) {
    let map = new Map();
    map.set(1, 1);
    map.set(2, 1);
    map.set(3, 1);
    let result = asArray(map);
    assert.equal(result.length, 3);
  });

  test('it works for [Object]', function (assert) {
    let result = asArray({ a: 1, b: 2, c: 3 });
    assert.equal(result.length, 3);
  });

  test('it works for [Object.toArray()]', function (assert) {
    let result = asArray({
      a: 1, toArray() {
        return [1, 2, 3];
      }
    });
    assert.equal(result.length, 3);
  });


  test('it works for [Strings]', function (assert) {
    let result = asArray('abc');
    assert.equal(result.length, 3);
  });

  test('it not works for number', function (assert) {
    try {
      asArray(1);
    } catch (e) {
      assert.ok(e.toString().includes('not supported'));
    }
  });

  test('it not works for non-iterable items', function (assert) {
    try {
      asArray(Symbol('a'));
    } catch (e) {
      assert.ok(e.toString().includes('not iterable'));
    }
  });

  test('it not works for non-object content in array-proxy-like items', function (assert) {
    try {
      const item = new Promise((r) => r());
      item.content = null;
      asArray(item)
    } catch (e) {
      assert.ok(e.toString().includes('Unknown content type in array-like object'));
    }
  });

  test('it works for object-like content in array-proxy-like items [arrays]', function (assert) {
    const item = new Promise((r) => r());
    item.content = [1, 2, 3];
    assert.equal(asArray(item).length, 3);
  });

  test('it works for object-like content in array-proxy-like items [objects]', function (assert) {
    const item = new Promise((r) => r());
    item.content = { a: 1, b: 2, c: 3 };
    assert.equal(asArray(item).length, 3);
  });

  test('it works for object-like content in array-proxy-like items [objects toArray]', function (assert) {
    const item = new Promise((r) => r());
    item.content = {
      a: 1, toArray() {
        return [1, 2, 3]
      }
    };
    assert.equal(asArray(item).length, 3);
  });

  test('it works for object-like content in array-proxy-like items [sets]', function (assert) {
    const item = new Promise((r) => r());
    item.content = new Set([1, 2, 3]);
    assert.equal(asArray(item).length, 3);
  });

  test('it works for ember object with toArray property [EmberObject]', function (assert) {
    const item = EmberObject.extend({ toArray() { return [1, 2, 3] } }).create();
    assert.equal(asArray(item).length, 3);
  });

  test('it works for object-like content in array-proxy-like items [maps]', function (assert) {
    const item = new Promise((r) => r());
    item.content = new Map();
    item.content.set(1, 1);
    item.content.set(2, 1);
    item.content.set(3, 1);
    assert.equal(asArray(item).length, 3);
  });

  test('it not works for proxy-like object as array', function (assert) {
    try {
      const item = new Promise((r) => r());
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('Promise-like objects is not supported as arrays'));
    }
  });

  test('it not works for WeakMap as array', function (assert) {
    try {
      const item = new WeakMap();
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('WeakMaps is not supported as arrays'));
    }
  });

  test('it not works for WeakSet as array', function (assert) {
    try {
      const item = new WeakSet();
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('WeakSets is not supported as arrays'));
    }
  });

  test('it not works for EmberObject as array', function (assert) {
    try {
      const item = EmberObject.extend({}).create();
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('EmberObjects is not supported as arrays'));
    }
  });
});
