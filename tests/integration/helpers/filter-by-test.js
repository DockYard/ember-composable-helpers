import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run, set } = Ember;

moduleForComponent('filter-by', 'Integration | Helper | {{filter-by}}', {
  integration: true
});

test('It filters by value', function(assert) {
  this.set('array', emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]));

  this.render(hbs`
    {{~#each (filter-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
});

test('It filters by truthiness', function(assert) {
  this.set('array', emberArray([
    { foo: 'x', name: 'a' },
    { foo: undefined, name: 'b' },
    { foo: 1, name: 'c' },
    { foo: null, name: 'd' },
    { foo: [1, 2, 3], name: 'e' },
    { foo: false, name: 'f' },
    { foo: 0, name: 'g' },
    { foo: '', name: 'h' },
    { foo: NaN, name: 'i' },
    { foo: [], name: 'j' }
  ]));

  this.render(hbs`
    {{~#each (filter-by 'foo' array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'acej', 'b, d, f, g, h and i are filtered out');
});

test('It recomputes the filter if array changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (filter-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ foo: true, name: 'd' }));

  assert.equal(find('*').textContent.trim(), 'acd', 'd is added');
});

test('It recomputes the filter if a value under given path changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (filter-by 'foo' true array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => set(array.objectAt(1), 'foo', true));

  assert.equal(find('*').textContent.trim(), 'abc', 'b is shown');
});

test('It recomputes the filter with a falsy value', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (filter-by 'foo' false array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  run(() => set(array.objectAt(0), 'foo', false));

  assert.equal(find('*').textContent.trim(), 'ab', 'a and b are shown');
});

test('It recomputes the filter with no value', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (filter-by 'foo' array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'ac', 'ac is shown');

  run(() => set(array.objectAt(1), 'foo', true));

  assert.equal(find('*').textContent.trim(), 'abc', 'b is added');
});

test('It can be passed an action', function(assert) {
  this.set('array', emberArray([
    { foo: 1, name: 'a' },
    { foo: 2, name: 'b' },
    { foo: 3, name: 'c' }
  ]));

  this.on('isOdd', (value) => value % 2 === 1);

  this.render(hbs`
    {{~#each (filter-by 'foo' (action 'isOdd') array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
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
    {{~#each (filter-by 'foo' firstTarget array) as |item|~}}
      {{~item.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'a', 'b and c are filtered out');
});
