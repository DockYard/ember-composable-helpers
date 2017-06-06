import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('array', 'Integration | Helper | {{array}}', {
  integration: true
});

test('creates array object in template', function(assert) {
  this.render(hbs`
    {{~#each (array 1 2 3) as |number|~}}
      {{number}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '123', 'creates array object in template');
});

test('has length property', function(assert) {
  this.render(hbs`
    {{~#with (array 1 2 3 5) as |a|~}}
      {{a.length}}
    {{~/with~}}
  `);

  assert.equal(find('*').textContent.trim(), '4', 'length is accessible');
});

test('re-evaluates when parameter changes', function(assert) {
  this.render(hbs`
    {{~#each (array 1 2 dynamic 3) as |number|~}}
      {{number}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '123', 'dynamic is not included when undefined');

  this.set('dynamic', 'π');
  assert.equal(find('*').textContent.trim(), '12π3', 'dynamic is included');
});

test('if evaluates empty array to false', function(assert) {
  this.render(hbs`
    {{~if (array) 'true' 'false'~}}
  `);
  assert.equal(find('*').textContent.trim(), 'false', 'empty array evaluates to false in .hbs template');
});
