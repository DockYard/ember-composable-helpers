import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reverse-sort', 'Integration | Helper | {{reverse-sort}}', {
  integration: true
});

test('It sorts by values in reverse order', function(assert) {
  this.set('array', emberArray([
    'c',
    'a',
    'b'
  ]));

  this.render(hbs`
    {{~#each (reverse-sort array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'cba', 'cab is sorted to cba');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    'b',
    'a',
    'd'
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (reverse-sort array) as |value|~}}
      {{~value~}}
    {{~/each~}}
  `);

  run(() => array.pushObject('c'));

  assert.equal(find('*').textContent.trim(), 'dcba', 'list is still sorted after addition');
});
