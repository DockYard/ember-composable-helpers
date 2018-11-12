import { inc } from 'dummy/helpers/inc';
import { module, test } from 'qunit';

module('Unit | Helper | inc', function() {
  test('it increments a value', function(assert) {
    let result = inc([1]);

    assert.equal(result, 2, 'should equal 2');
  });

  test('it increments a value by step', function(assert) {
    let result = inc([1, 2]);

    assert.equal(result, 3, 'should equal 3');
  });

  test('it increments a value by step float', function(assert) {
    let result = inc([1.5, 2]);

    assert.equal(result, 3.5, 'should equal 3.5');
  });
});
