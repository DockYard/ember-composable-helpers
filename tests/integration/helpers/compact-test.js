import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { A: emberArray, run, set } = Ember;

moduleForComponent('compact', 'Integration | Helper | {{compact}}', {
  integration: true
});

test('Removes empty values in standard arrays', function(assert) {
  this.set('array', emberArray([1, 2, null, 3, false]));
  this.render(hbs`
    {{~#each (compact array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '123false', 'null is removed');
});

test('It gracefully handles non-array values', function(assert) {
  this.set('notArray', 1);
  this.render(hbs`
    {{~#each (compact notArray) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '1', 'the non array value is rendered');
});

test('It recomputes the filter if the array changes', function(assert) {
  this.set('array', emberArray([1, 2, null, 3]));
  this.render(hbs`
    {{~#each (compact array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '123', 'null is removed');

  this.set('array', emberArray([1, null, null, 3]));

  assert.equal(this.$().text().trim(), '13', 'null is removed');
});

test('It recomputes the filter if an item in the array changes', function(assert) {
  let array = emberArray([1, 2, null, 3]);
  this.set('array', array);
  this.render(hbs`
    {{~#each (compact array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '123', 'null is removed');

  run(() => array.replace(2, 1, [5]));

  assert.equal(this.$().text().trim(), '1253', 'null is removed');
});

test('Removes empty values from objects', function(assert) {
  this.set('obj', { keyA: 1, keyB: 2, keyC: null, keyD: 4 });
  this.render(hbs`
    {{~#each-in (compact obj) as |key value|~}}
      {{key}}{{value}}
    {{~/each-in~}}
  `);

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');
});

test('Recomputes if the object changes', function(assert) {
  this.set('obj', { keyA: 1, keyB: 2, keyC: null, keyD: 4 });
  this.render(hbs`
    {{~#each-in (compact obj) as |key value|~}}
      {{key}}{{value}}
    {{~/each-in~}}
  `);

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');

  this.set('obj', { keyA: 1, keyB: 2, keyC: 3, keyD: 4 });

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyC3keyD4');
});

test('Recomputes if a value on the object changes', function(assert) {
  let obj = { keyA: 1, keyB: 2, keyC: null, keyD: 4 };
  this.set('obj', obj);
  this.render(hbs`
    {{~#each-in (compact obj) as |key value|~}}
      {{key}}{{value}}
    {{~/each-in~}}
  `);

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');

  run(() => set(obj, 'keyC', 3));

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyC3keyD4');
});

test('New keys do not cause rerender', function(assert) {
  let obj = { keyA: 1, keyB: 2, keyC: null, keyD: 4 };
  this.set('obj', obj);
  this.render(hbs`
    {{~#each-in (compact obj) as |key value|~}}
      {{key}}{{value}}
    {{~/each-in~}}
  `);

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');

  run(() => set(obj, 'keyE', 5));

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');
});

test('Gracefully handles arrays and objects interchangeably', function(assert) {
  this.set('value', emberArray([1, 2, null, 3]));
  this.set('isArray', true);

  this.render(hbs`
    {{#with (compact value) as |compactedValue|}}
      {{#if isArray}}
        {{~#each compactedValue as |value|~}}
          {{value}}
        {{~/each~}}
      {{else}}
        {{~#each-in compactedValue as |key value|~}}
          {{key}}{{value}}
        {{~/each-in~}}
      {{/if}}
    {{/with}}
  `);

  assert.equal(this.$().text().trim(), '123', 'null is removed');

  this.set('value', { keyA: 1, keyB: 2, keyC: null, keyD: 4 });
  this.set('isArray', false);

  assert.equal(this.$().text().trim(), 'keyA1keyB2keyD4');
});
