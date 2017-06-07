import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('range', 'Integration | Helper | {{range}}', {
  integration: true
});

test('it generates a range', function(assert) {
  this.render(hbs`
    {{~#each (range 1 5) as |number|~}}
      {{~number~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '1234', 'should generate a range');
});

test('it generates a negative range', function(assert) {
  this.render(hbs`
    {{~#each (range 5 1) as |number|~}}
      {{~number~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '5432', 'should generate a negative range');
});

test('it generates an inclusive range', function(assert) {
  this.render(hbs`
    {{~#each (range 1 5 true) as |number|~}}
      {{~number~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '12345', 'should generate an inclusive range');
});

test('it generates a negative inclusive range', function(assert) {
  this.render(hbs`
    {{~#each (range 5 1 true) as |number|~}}
      {{~number~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '54321', 'should generate a negative inclusive range');
});

