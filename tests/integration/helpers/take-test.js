import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('take', 'Integration | Helper | {{take}}', {
  integration: true
});

test('It takes the first N entries of array', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4, 5]));

  this.render(hbs`
    {{~#each (take array 2) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '12', 'first two values are kept');
});

test('It watches for changes', function(assert) {
  let array = emberArray([1, 2, 3, 4, 5]);
  this.set('array', array);

  this.render(hbs`
    {{~#each (take array 2) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  run(() => array.unshiftObject(0));

  assert.equal(this.$().text().trim(), '01', '0 and 1 are kept');
});
