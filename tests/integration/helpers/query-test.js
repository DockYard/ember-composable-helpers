import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('query-by', 'Integration | Helper | {{query-by}}', {
  integration: true
});

test('It finds a value by a property', function(assert) {
  this.set('array', emberArray([
    { foo: true, prop: 'foo' },
    { foo: false, prop: 'bar' },
    { foo: true, prop: 'baz' }
  ]));

  this.render(hbs`
    {{#each (query-by 'prop' 'foo' array) as |item|}}
      {{item.prop}}
    {{/each}}
  `);

  assert.equal(find('*').textContent.trim(), 'foo', 'foo is shown');
});

test('It finds a value by a property in arrays without prototype extensions', function(assert) {
  this.set('array', [
    { foo: true, prop: 'foo' },
    { foo: false, prop: 'bar' },
    { foo: true, prop: 'baz' }
  ]);

  this.render(hbs`
    {{#each (query-by 'prop' 'foo' array) as |item|}}
      {{item.prop}}
    {{/each}}
  `);

  assert.equal(find('*').textContent.trim(), 'foo', 'foo is shown');
});

test('It recomputes the filter if array changes', function(assert) {
  let array = emberArray([
    { foo: true, prop: 'foo' },
    { foo: false, prop: 'bar' },
    { foo: true, prop: 'baz' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{#each (query-by 'prop' 'don' array) as |item|}}
      {{item.prop}}
    {{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'don is not found');

  run(() => array.pushObject({ foo: true, prop: 'don' }));

  assert.equal(find('*').textContent.trim(), 'don', 'don is added and shown');
});

test('It recomputes the filter if a value under given path changes', function(assert) {
  let array = emberArray([
    { foo: true, prop: 'foo' },
    { foo: false, prop: 'bar' },
    { foo: true, prop: 'baz' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{#each (query-by 'prop' 'don' array) as |item|}}
      {{item.prop}}
    {{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'don is not found');

  run(() => set(array.objectAt(1), 'prop', 'don'));

  assert.equal(find('*').textContent.trim(), 'don', 'don is shown');
});

test('It recomputes the value changes', function(assert) {
  let array = emberArray([
    { foo: true, prop: 'foo' },
    { foo: false, prop: 'bar' },
    { foo: true, prop: 'baz' }
  ]);

  this.set('array', array);
  this.set('value', 'don');

  this.render(hbs`
    {{#each (query-by 'prop' value array) as |item|}}
      {{item.prop}}
    {{/each}}
  `);

  assert.equal(find('*').textContent.trim(), '', 'don is not found');

  run(() => set(this, 'value', 'baz'));

  assert.equal(find('*').textContent.trim(), 'baz', 'baz is shown');
});
