import { compose } from 'dummy/helpers/compose';
import { module, test } from 'qunit';

module('Unit | Helper | compose');

function add(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

test('it composes two functions', function(assert) {
  let composed = compose([square, add]);
  let result = composed(2, 4);

  assert.equal(result, 36, 'it composes two functions');
});
