import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run, set } = Ember;

moduleForComponent('find-by', 'Integration | Helper | {{find-by}}', {
  integration: true
});

test('It finds a value by a property', function(assert) {
  this.set('array', emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]));

  this.render(hbs`
    {{~#with (find-by 'name' 'b' array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'b', 'b is shown');
});

test('It finds a value by a property in arrays without prototype extensions', function(assert) {
  this.set('array', [
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.render(hbs`
    {{~#with (find-by 'name' 'b' array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'b', 'b is shown');
});

test('It recomputes the filter if array changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#with (find-by 'name' 'd' array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), '', 'd is not found');

  run(() => array.pushObject({ foo: true, name: 'd' }));

  assert.equal(this.$().text().trim(), 'd', 'd is added and shown');
});

test('It recomputes the filter if a value under given path changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#with (find-by 'name' 'd' array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), '', 'd is not found');

  run(() => set(array.objectAt(1), 'name', 'd'));

  assert.equal(this.$().text().trim(), 'd', 'd is shown');
});

test('It recomputes the value changes', function(assert) {
  let array = emberArray([
    { foo: true, name: 'a' },
    { foo: false, name: 'b' },
    { foo: true, name: 'c' }
  ]);

  this.set('array', array);
  this.set('value', 'd');

  this.render(hbs`
    {{~#with (find-by 'name' value array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), '', 'd is not found');

  run(() => set(this, 'value', 'b'));

  assert.equal(this.$().text().trim(), 'b', 'b is shown');
});