import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dec', 'Integration | Helper | {{dec}}', {
  integration: true
});

test('it decrements a value', function(assert) {
  this.render(hbs`{{dec 3}}`);

  assert.equal(find('*').textContent.trim(), '2', 'should decrement by 1');
});

test('it decrements a value', function(assert) {
  this.render(hbs`{{dec 2 5}}`);

  assert.equal(find('*').textContent.trim(), '3', 'should decrement by 2');
});

test('it decrements below 0', function(assert) {
  this.render(hbs`{{dec 2 0}}`);

  assert.equal(find('*').textContent.trim(), '-2', 'should be -2');
});

test('It can decrement a string', function(assert) {
  this.render(hbs`{{dec "2"}}`);

  assert.equal(find('*').textContent.trim(), '1', 'should decrement by 1');
});

test('It handles when undefined is passed', function(assert) {
  this.render(hbs`{{dec}}`);

  assert.equal(find('*').textContent.trim(), '', 'should not return a value');
});
