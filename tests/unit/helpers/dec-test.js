import { dec } from 'dummy/helpers/dec';
import { module, test } from 'qunit';

module('Unit | Helper | dec');

test('it decrements a value', function(assert) {
  let result = dec([2]);

  assert.equal(result, 1, 'should equal 1');
});

test('it decrements a value by step', function(assert) {
  let result = dec([3, 2]);

  assert.equal(result, 1, 'should equal 1');
});
