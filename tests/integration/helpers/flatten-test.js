import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flatten', 'Integration | Helper | {{flatten}}', {
  integration: true
});

test('it flattens an array', function(assert) {
  this.render(hbs`
    {{#each (flatten (repeat 3 (range 1 3 true))) as |number|}}{{number}}{{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '123123123', 'should handle a single level depth array');
});

test('it flattens an array of arrays', function(assert) {
  this.set('array', [1, [2, 3], [4, [5, 6]]]);
  this.render(hbs`
    {{#each (flatten array) as |number|}}{{number}}{{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '123456', 'should handle multi level depth array');
});

test('it handles empty array', function(assert) {
  this.set('array', []);
  this.render(hbs`
    {{#each (flatten array) as |number|}}{{number}}{{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'should handle an empty array');
});

test('it handles null input', function(assert) {
  this.render(hbs`
    {{#each (flatten null) as |number|}}{{number}}{{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'should handle null input');
});

test('it handles undefined input', function(assert) {
  this.render(hbs`
    {{#each (flatten undefined) as |number|}}{{number}}{{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'should handle undefined input');
});
