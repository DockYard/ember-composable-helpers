import { shuffle } from 'dummy/helpers/shuffle';
import { module, test } from 'qunit';

module('Unit | Helper | shuffle', function() {
  test('it exports a shuffle function', function(assert) {
    let result = shuffle([2]);
    assert.ok(result);
  });
});
