import { inc } from 'dummy/helpers/inc';
import { module, test } from 'qunit';

module('Unit | Helper | inc');

test('it increments a value', function(assert) {
  let result = inc([1]);

  assert.equal(result, 2, 'should equal 2');
});

test('it increments a value by step', function(assert) {
  let result = inc([1, 2]);

  assert.equal(result, 3, 'should equal 3');
});
