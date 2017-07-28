import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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

  assert.equal(find('*').textContent.trim(), '123false', 'null is removed');
});

test('It gracefully handles non-array values', function(assert) {
  this.set('notArray', 1);
  this.render(hbs`
    {{~#each (compact notArray) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '1', 'the non array value is rendered');
});

test('It recomputes the filter if the array changes', function(assert) {
  this.set('array', emberArray([1, 2, null, 3]));
  this.render(hbs`
    {{~#each (compact array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '123', 'null is removed');

  this.set('array', emberArray([1, null, null, 3]));

  assert.equal(find('*').textContent.trim(), '13', 'null is removed');
});

test('It recomputes the filter if an item in the array changes', function(assert) {
  let array = emberArray([1, 2, null, 3]);
  this.set('array', array);
  this.render(hbs`
    {{~#each (compact array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '123', 'null is removed');

  run(() => array.replace(2, 1, [5]));

  assert.equal(find('*').textContent.trim(), '1253', 'null is removed');
});
