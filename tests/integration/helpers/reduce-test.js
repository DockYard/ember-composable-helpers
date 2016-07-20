import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('filter', 'Integration | Helper | {{reduce}}', {
  integration: true
});

test('It accepts a callback', function(assert) {
  this.set('array', emberArray([1, 2, 3]));

  this.on('callback', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "callback") 0 array}}`);

  assert.equal(this.$().text(), 6);
});

test('It re-evaluates when array content changes', function(assert) {
  let array = emberArray([1, 2, 3]);

  this.set('array', array);

  this.on('callback', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "callback") 0 array}}`);

  assert.equal(this.$().text(), 6);

  run(() => array.pushObject(4));

  assert.equal(this.$().text(), 10);
});

test('It re-evaluates when initial value changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));
  this.set('initialValue', 0);

  this.on('callback', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "callback") initialValue array}}`);

  assert.equal(this.$().text(), 6);

  this.set('initialValue', 4);

  assert.equal(this.$().text(), 10);
});

test('It re-evaluates when callback changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));

  this.on('positive', (previousValue, currentValue) => previousValue + currentValue);
  this.on('negative', (previousValue, currentValue) => previousValue - currentValue);

  this.render(hbs`{{reduce (action (if isNegative "negative" "positive")) 0 array}}`);

  assert.equal(this.$().text(), 6);

  this.set('isNegative', true);

  assert.equal(this.$().text(), -6);
});