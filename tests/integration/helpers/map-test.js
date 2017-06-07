import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('map', 'Integration | Helper | {{map}}', {
  integration: true
});

test('It maps by value', function(assert) {
  this.set('array', emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]));

  this.on('getName', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map (action "getName") array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'abc', 'name property is mapped');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]);

  this.set('array', array);

  this.on('getName', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map (action "getName") array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'abc', 'precondition');

  run(() => array.pushObject({ name: 'd' }));

  assert.equal(find('*').textContent.trim(), 'abcd', 'd is added');
});
