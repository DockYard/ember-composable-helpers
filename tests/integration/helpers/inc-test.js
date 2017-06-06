import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inc', 'Integration | Helper | {{inc}}', {
  integration: true
});

test('it increments a value', function(assert) {
  this.render(hbs`{{inc 1}}`);

  assert.equal(find('*').textContent.trim(), '2', 'should increment by 1');
});

test('it increments a value', function(assert) {
  this.render(hbs`{{inc 2 1}}`);

  assert.equal(find('*').textContent.trim(), '3', 'should increment by 2');
});

test('It can increment a string', function(assert) {
  this.render(hbs`{{inc "1"}}`);

  assert.equal(find('*').textContent.trim(), '2', 'should increment by 1');
});

test('It handles when undefined is passed', function(assert) {
  this.render(hbs`{{inc}}`);

  assert.equal(find('*').textContent.trim(), '', 'should not return a value');
});
