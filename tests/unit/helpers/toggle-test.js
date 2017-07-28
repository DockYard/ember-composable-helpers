import { get } from '@ember/object';
import { toggle } from 'dummy/helpers/toggle';
import { module, test } from 'qunit';

module('Unit | Helper | toggle');

test('it toggles the property', function(assert) {
  let jimBob = { isAlive: false };
  let action = toggle(['isAlive', jimBob]);
  action();

  assert.ok(get(jimBob, 'isAlive') === true, 'should be true');
});

test('it correctly toggles non-boolean falsey values', function(assert) {
  let jimBob = { isAlive: undefined };
  let action = toggle(['isAlive', jimBob]);
  action();

  assert.ok(get(jimBob, 'isAlive') === true, 'should be true');
});

test('it correctly toggles non-boolean truthy values', function(assert) {
  let jimBob = { isAlive: {} };
  let action = toggle(['isAlive', jimBob]);
  action();

  assert.ok(get(jimBob, 'isAlive') === false, 'should be false');
});
