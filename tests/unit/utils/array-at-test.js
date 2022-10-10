import arrayAt from 'ember-composable-helpers/utils/array-at';
import { module, test } from 'qunit';

module('Unit | Utility | array-at', function() {

  test('it works', function(assert) {
    const val = {};
    assert.strictEqual(arrayAt([{}, {}, val], 2), val);
  });

  test('it works for negative values', function(assert) {
    const val = {};
    assert.strictEqual(arrayAt([{}, val, {}], -2), val);
  });

  test('missing value return undefined', function(assert) {
    assert.deepEqual(arrayAt([], 3), undefined);
  });
});
