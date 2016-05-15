import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray } = Ember;

moduleForComponent('append', 'Integration | Helper | {{length}}', {
  integration: true
});

test('It returns the length of an array', function(assert) {
  this.set('array', emberArray([2, 4, 6]));

  this.render(hbs`
    {{length array}}
  `);

  let expected = '3';

  assert.equal(this.$().text().trim(), expected, 'length value');
});
