import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('filter', 'Integration | Helper | {{filter}}', {
  integration: true
});

test('It filters by truthiness', function(assert) {
  this.set('array', emberArray([
    { foo: 'x',  name: 'a' },
    { foo: undefined, name: 'b' },
    { foo: 1,  name: 'c' },
    { foo: null,  name: 'd' },
    { foo: [1, 2, 3],  name: 'e' }
  ]));

  this.on('truthyFoo', function({ foo }) {
    return !!foo;
  });

  this.render(hbs`
    {{~#each (filter (action "truthyFoo") array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'ace', 'b and d are filtered out');
});

test('It recomputes the filter if array changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.on('getFoo', function({ foo }) {
    return foo;
  });

  this.render(hbs`
    {{~#each (filter (action "getFoo") array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ foo: true, name: 'd' }));

  assert.equal(this.$().text().trim(), 'acd', 'd is added');
});

test('It can be passed an action', function(assert) {
  this.set('array', emberArray([
    { foo: 1, name: 'a' },
    { foo: 2, name: 'b' },
    { foo: 3, name: 'c' }
  ]));

  this.on('isOdd', ({ foo }) => foo % 2 !== 0);

  this.render(hbs`
    {{~#each (filter (action "isOdd") array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'ac', 'b is filtered out');
});
