import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray } = Ember;

moduleForComponent('slice', 'Integration | Helper | {{slice}}', {
  integration: true
});

test('It slices an array with positional params', function(assert) {
  this.set('array', emberArray([2, 4, 6]));

  this.render(hbs`
    {{slice 1 3 array}}
  `);

  let expected = '4,6';

  assert.equal(this.$().text().trim(), expected, 'appends values');
});

test('It slices an array with named params', function(assert) {
  this.set('array', emberArray([2, 4, 6]));

  this.render(hbs`
    {{slice array=array start=1 end=3}}
  `);

  let expected = '4,6';

  assert.equal(this.$().text().trim(), expected, 'appends values');
});
