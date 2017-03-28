import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('slice', 'Integration | Helper | {{slice}}', {
  integration: true
});

test('It slices an array with positional params', function(assert) {
  this.set('array', emberArray([2, 4, 6]));

  this.render(hbs`
    {{slice 1 3 array}}
  `);

  assert.equal(this.$().text().trim(), '4,6', 'sliced values');
});

test('It recomputes the slice if an item in the array changes', function(assert) {
  let array = emberArray([2, 4, 6]);
  this.set('array', array);

  this.render(hbs`
    {{slice 1 3 array}}
  `);

  assert.equal(this.$().text().trim(), '4,6', 'sliced values');

  run(() => array.replace(2, 1, [5]));

  assert.equal(this.$().text().trim(), '4,5', 'sliced values');
});

test('It slices an array with only two params (start, array) passed to the helper', function(assert) {
  this.set('array', emberArray([2, 4, 6]));

  this.render(hbs`
    {{slice 1 array}}
  `);

  assert.equal(this.$().text().trim(), '4,6', 'sliced values');

  this.render(hbs`
    {{slice -1 array}}
  `);

  assert.equal(this.$().text().trim(), '6', 'sliced values');
});
