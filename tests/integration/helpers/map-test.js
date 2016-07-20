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
    {{~#each (map (action 'getName') array) as |name|~}}
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

  this.on('getName', function({ name }) {
    return name;
  });

  this.render(hbs`
    {{~#each (map (action 'getName') array) as |name|~}}
      {{~name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ name: 'd' }));

  assert.equal(this.$().text().trim(), 'abcd', 'd is added');
});

test('It watches for changes to action', function(assert) {
  let array = emberArray([
    { name: 'a', x: 1 },
    { name: 'b', x: 2 },
    { name: 'c', x: 3 }
  ]);

  this.set('array', array);

  this.on('getName', ({ name }) => name);
  this.on('getX', ({ x }) => x);

  this.render(hbs`
    {{~#each (map (action (if showValues "getX" "getName")) array) as |text|~}}
      {{~text~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'abc', 'abc is displayed');

  this.set('showValues', true);

  assert.equal(this.$().text().trim(), '123', '123 is displayed');
});
