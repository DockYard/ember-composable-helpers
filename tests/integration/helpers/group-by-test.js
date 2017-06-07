import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run, set } = Ember;

moduleForComponent('group-by', 'Integration | Helper | {{group-by}}', {
  integration: true
});

test('It groups by given property', function(assert) {
  this.set('array', emberArray([
    { category: 'a', name: 'a' },
    { category: 'b', name: 'c' },
    { category: 'a', name: 'b' },
    { category: 'b', name: 'd' }
  ]));

  this.render(hbs`
    {{~#each-in (group-by 'category' array) as |category entries|~}}
      {{~category~}}
      {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
    {{~/each-in~}}
  `);

  assert.equal(find('*').textContent.trim(), 'aabbcd', 'aabbcd is the right order');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    { category: 'a', name: 'a' },
    { category: 'b', name: 'c' },
    { category: 'a', name: 'b' },
    { category: 'b', name: 'd' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each-in (group-by 'category' array) as |category entries|~}}
      {{~category~}}
      {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
    {{~/each-in~}}
  `);

  run(() => set(array.objectAt(3), 'category', 'c'));

  assert.equal(find('*').textContent.trim(), 'aabbccd', 'aabbccd is the right order');
});
