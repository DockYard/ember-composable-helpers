import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { A: emberArray } = Ember;

moduleForComponent('Uniq', 'Integration | Helper | {{uniq}}', {
  integration: true
});

test('Removes duplicate values in standard arrays', function(assert) {
  this.set('array', emberArray([1, 2, 2, null]));
  this.render(hbs`
    {{~#each (uniq array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '12', 'removes duplicate value');
});

test('It gracefully handles non-array values', function(assert) {
  this.set('notArray', 1);
  this.render(hbs`
    {{~#each (uniq notArray) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '1', 'the non array value is rendered');
});

test('It recomputes the filter if the array changes', function(assert) {
  this.set('array', emberArray([1, 2, 2]));
  this.render(hbs`
    {{~#each (uniq array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '12', 'duplicate value is removed');

  this.set('array', emberArray([1, 2, 2, 3]));

  assert.equal(this.$().text().trim(), '123', 'duplicate value is removed and array re-renders');
});
