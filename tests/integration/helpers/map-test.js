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

  this.set('getName', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map getName array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'abc', 'name property is mapped');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]);

  this.set('array', array);

  this.set('getName', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map getName array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ name: 'd' }));

  assert.equal(this.$().text().trim(), 'abcd', 'd is added');
});

test('It watches for changes to byPath', function(assert) {
  let array = emberArray([
    { name: 'a', x: 1 },
    { name: 'b', x: 2 },
    { name: 'c', x: 3 }
  ]);

  this.set('array', array);
  this.set('callback', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map callback array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  this.set('callback', function({ x }) {
    return x;
  });

  assert.equal(this.$().text().trim(), '123', '123 is displayed');
});
