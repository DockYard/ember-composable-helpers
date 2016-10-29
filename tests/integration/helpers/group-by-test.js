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

  assert.equal(this.$().text().trim(), 'aabbcd', 'aabbcd is the right order');
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

  assert.equal(this.$().text().trim(), 'aabbccd', 'aabbccd is the right order');
});

test('It groups by properties that contain punctuation', function(assert) {
  this.set('array', emberArray([
    { category: 'a, inc.', name: 'a' },
    { category: 'b, co.', name: 'b' },
    { category: 'c. l.l.p.', name: 'c' },
    { category: 'd & co.', name: 'd' }
  ]));

  this.render(hbs`
    {{~#each-in (group-by 'category' array) as |category entries|~}}
      {{~category~}}
      {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
    {{~/each-in~}}
  `);

  assert.equal(this.$().text().trim(), 'a, inc.ab, co.bc. l.l.p.cd & co.d', 'a, inc.ab, co.bc. l.l.p.cd & co.d is the right output');
});

