import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('map-by', 'Integration | Helper | {{map-by}}', {
  integration: true
});

test('It maps by value', function(assert) {
  this.set('array', emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]));

  this.render(hbs`
    {{~#each (map-by 'name' array) as |name|~}}
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

  this.render(hbs`
    {{~#each (map-by 'name' array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ name: 'd' }));

  assert.equal(find('*').textContent.trim(), 'abcd', 'd is added');
});

test('It watches for changes to byPath', function(assert) {
  let array = emberArray([
    { name: 'a', x: 1 },
    { name: 'b', x: 2 },
    { name: 'c', x: 3 }
  ]);

  this.set('array', array);
  this.set('property', 'name');

  this.render(hbs`
    {{~#each (map-by property array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  this.set('property', 'x');

  assert.equal(find('*').textContent.trim(), '123', '123 is displayed');
});
