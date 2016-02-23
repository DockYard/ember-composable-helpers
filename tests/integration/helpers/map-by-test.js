import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

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

  assert.equal(this.$().text().trim(), 'abc', 'name property is mapped');
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

  assert.equal(this.$().text().trim(), 'abcd', 'd is added');
});
