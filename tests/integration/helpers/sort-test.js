import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sort', 'Integration | Helper | {{sort}}', {
  integration: true
});

test('It sorts by values', function(assert) {
  this.set('array', emberArray([
    'c',
    'a',
    'b'
  ]));

  this.render(hbs`
    {{~#each (sort array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'abc', 'cab is sorted to abc');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    'b',
    'a',
    'd'
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (sort array) as |value|~}}
      {{~value~}}
    {{~/each~}}
  `);

  run(() => array.pushObject('c'));

  assert.equal(find('*').textContent.trim(), 'abcd', 'list is still sorted after addition');
});
