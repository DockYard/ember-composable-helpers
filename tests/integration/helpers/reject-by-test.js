import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run, set } = Ember;

moduleForComponent('reject-by', 'Integration | Helper | {{reject-by}}', {
  integration: true
});

test('It reject by value', function(assert) {
  this.set('array', emberArray([
    { foo: false, name: 'a' },
    { foo: true, name: 'b' },
    { foo: false, name: 'c' }
  ]));

  this.render(hbs`
    {{~#each (reject-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'ac', 'b is filtered out');
});

test('It rejects by truthiness', function(assert) {
  this.set('array', emberArray([
    { foo: 'x',  name: 'a' },
    { foo: undefined, name: 'b' },
    { foo: 1,  name: 'c' },
    { foo: null,  name: 'd' },
    { foo: [1, 2, 3],  name: 'e' }
  ]));

  this.render(hbs`
    {{~#each (reject-by 'foo' array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bd', 'a, c and e are filtered out');
});

test('It recomputes the filter if array changes', function(assert) {
  let array = emberArray([
    { foo: false, name: 'a' },
    { foo: true, name: 'b' },
    { foo: false, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (reject-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ foo: false, name: 'd' }));

  assert.equal(this.$().text().trim(), 'acd', 'd is added');
});

test('It recomputes the filter if a value under given path changes', function(assert) {
  let array = emberArray([
    { foo: false, name: 'a' },
    { foo: true, name: 'b' },
    { foo: false, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (reject-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => set(array.objectAt(1), 'foo', false));

  assert.equal(this.$().text().trim(), 'abc', 'b is shown');
});

test('It can be passed an action', function(assert) {
  this.set('array', emberArray([
    { foo: 1, name: 'a' },
    { foo: 2, name: 'b' },
    { foo: 3, name: 'c' }
  ]));

  this.on('isEven', (value) => value % 2 === 0);

  this.render(hbs`
    {{~#each (reject-by 'foo' (action 'isEven') array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'ac', 'b is filtered out');
});

test('It respects objects that implement isEqual interface', function(assert) {
  this.set('firstTarget', {
    isEqual(value) {
      return value === 1;
    }
  });

  this.set('array', emberArray([
    { foo: 1, name: 'a' },
    { foo: 2, name: 'b' },
    { foo: 3, name: 'c' }
  ]));

  this.render(hbs`
    {{~#each (reject-by 'foo' firstTarget array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'bc', 'a is filtered out');
});