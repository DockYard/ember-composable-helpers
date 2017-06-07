import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('filter', 'Integration | Helper | {{reduce}}', {
  integration: true
});

test('It accepts a callback', function(assert) {
  this.set('array', emberArray([1, 2, 3]));

  this.on('sum', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "sum") 0 array}}`);

  assert.equal(find('*').textContent, 6);
});

test('It re-evaluates when array content changes', function(assert) {
  let array = emberArray([1, 2, 3]);

  this.set('array', array);

  this.on('sum', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "sum") 0 array}}`);

  assert.equal(find('*').textContent, 6);

  run(() => array.pushObject(4));

  assert.equal(find('*').textContent, 10);
});

test('It re-evaluates when initial value changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));
  this.set('initialValue', 0);

  this.on('sum', (previousValue, currentValue) => previousValue + currentValue);

  this.render(hbs`{{reduce (action "sum") initialValue array}}`);

  assert.equal(find('*').textContent, 6);

  this.set('initialValue', 4);

  assert.equal(find('*').textContent, 10);
});
