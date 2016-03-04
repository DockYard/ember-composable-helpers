import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('chunk', 'Integration | Helper | {{chunk}}', {
  integration: true
});

test('It chunks an empty array', function(assert) {
  this.set('array', []);
  this.set('size', 2);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

  assert.equal(this.$().text().trim(), '', 'nothing is displayed');
});

test('It chunks an array into 0 parts', function(assert) {
  this.set('array', [1, 2, 3]);
  this.set('size', 0);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

  assert.equal(this.$().text().trim(), '', 'nothing is displayed');
});

test('It chunks an array into negative parts', function(assert) {
  this.set('array', [1, 2, 3]);
  this.set('size', -1);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

  assert.equal(this.$().text().trim(), '', 'nothing is displayed');
});

test('It chunks an array into parts of 1', function(assert) {
  this.set('array', [1, 2, 3]);
  this.set('size', 1);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}} {{/each}}`);

  assert.equal(this.$().text().trim(), '1 2 3', 'chunked arrays are displayed');
});

test('It chunks an array into parts of current array length', function(assert) {
  this.set('array', [1, 2, 3]);
  this.set('size', 3);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}}{{chunkedArray.[2]}}{{/each}}`);

  assert.equal(this.$().text().trim(), '123', 'chunked arrays are displayed');
});

test('It chunks an array into parts of more than the current array length', function(assert) {
  this.set('array', [1, 2, 3]);
  this.set('size', 5);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}}{{chunkedArray.[2]}}{{/each}}`);

  assert.equal(this.$().text().trim(), '123', 'chunked arrays are displayed');
});

test('It chunks an array into parts of less than current array length', function(assert) {
  this.set('array', [10, 20, 30, 40, 50, 60, 70]);
  this.set('size', 2);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`);

  assert.equal(this.$().text().trim(), '1020 3040 5060 70', 'chunked arrays are displayed');
});

test('It recomputes if the size changes', function(assert) {
  this.set('array', [1, 2, 3, 4]);
  this.set('size', 1);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`);

  assert.equal(this.$().text().trim(), '1 2 3 4', 'chunked arrays are displayed');

  this.set('size', 2);

  assert.equal(this.$().text().trim(), '12 34', 'updated chunked arrays are displayed');
});

test('It recomputes if the array changes', function(assert) {
  this.set('array', [1, 2, 3, 4]);
  this.set('size', 2);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`);

  assert.equal(this.$().text().trim(), '12 34', 'chunked arrays are displayed');

  this.set('array', [5, 6, 7, 8]);

  assert.equal(this.$().text().trim(), '56 78', 'updated chunked arrays are displayed');
});

test('It recomputes if an item in the array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4]));
  this.set('size', 2);

  this.render(hbs`{{#each (chunk array size) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`);

  assert.equal(this.$().text().trim(), '12 34', 'chunked arrays are displayed');

  run(() => this.get('array').pushObjects(['some', 'new', 'items']));

  assert.equal(this.$().text().trim(), '12 34 somenew items', 'updated chunked arrays are displayed');
});
