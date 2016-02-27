import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('reverse', 'Integration | Helper | {{reverse}}', {
  integration: true
});

test('it reverses an array', function(assert) {
  this.set('array', emberArray(['foo', 'bar', 'baz']));
  this.render(hbs`
    {{~#each (reverse array) as |item|~}}
      {{~item~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bazbarfoo', 'array is reversed');
});

test('It handles a non-ember array', function(assert) {
  this.set('array', ['foo', 'bar', 'baz']);
  this.render(hbs`
    {{~#each (reverse array) as |item|~}}
      {{~item~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bazbarfoo', 'array is reversed');
});

test('It does not mutate the original array', function(assert) {
  let array = ['foo', 'bar', 'baz'];
  this.set('array', array);
  this.render(hbs`
    {{~#each (reverse array) as |item|~}}
      {{~item~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bazbarfoo', 'array is reversed');
  assert.deepEqual(this.get('array'), ['foo', 'bar', 'baz'], 'the original array is not reversed');
});

test('It safely handles non-array values', function(assert) {
  this.set('array', 'foo');
  this.render(hbs`
    {{~#each (reverse array) as |item|~}}
      {{~item~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'foo', 'foo is rendered');
});

test('It recomputes when an item in the array changes', function(assert) {
  let array = emberArray(['foo', 'bar', 'baz']);
  this.set('array', array);
  this.render(hbs`
    {{~#each (reverse array) as |item|~}}
      {{~item~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bazbarfoo', 'array is reversed');

  run(() => array.removeAt(1));

  assert.equal(this.$().text().trim(), 'bazfoo', 'array is reversed');
});
