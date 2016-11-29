import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('previous', 'Integration | Helper | {{previous}}', {
  integration: true
});

test('It returns the previous value in an array non-primitive values', function(assert) {
  this.set('array', emberArray([
    { name: 'a' },
    { name: 'b' },
    { name: 'c' }
  ]));

  this.set('value', { name: 'b' });
  this.set('useDeepEqual', true);

  this.render(hbs`
    {{~#with (previous value useDeepEqual array) as |item|~}}
      {{~item.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'a', 'a is shown');
});

test('It returns the previous value in an array of primitive values', function(assert) {
  this.set('array', emberArray(['lemon', 'kiwi', 'peach']));

  this.set('value', 'peach');

  this.render(hbs`
    {{~#with (previous value array) as |item|~}}
      {{~item~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'kiwi', 'kiwi is shown');
});

test('It recomputes if array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));

  this.render(hbs`
    {{~#with (previous 3 array) as |item|~}}
      {{~item~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 2, '2 is shown');

  run(() => this.set('array', [2, 1, 3]));

  assert.equal(this.$().text().trim(), 1, '1 is added and shown');
});

test('It returns the previous value in an array of related models', function(assert) {
  this.inject.service('store');

  run(() => {
    let person = this.get('store').createRecord('person', {
      name: 'Adam'
    });

    person.get('pets').pushObjects([
      this.get('store').createRecord('pet', { name: 'Kirby' }),
      this.get('store').createRecord('pet', { name: 'Jake' })
    ]);

    this.set('model', person);
    this.set('currentPet', person.get('pets.lastObject'));
  });

  this.render(hbs`
    {{~#with (previous currentPet model.pets) as |pet|~}}
      {{~pet.name~}}
    {{~/with~}}
  `);

  assert.equal(this.$().text().trim(), 'Kirby', 'the previous pet name is shown');
});
