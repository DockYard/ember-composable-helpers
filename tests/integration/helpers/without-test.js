import ArrayProxy from '@ember/array/proxy';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('without', 'Integration | Helper | {{without}}', {
  integration: true
});

test('it returns a new array with given value ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);

  this.render(hbs`
    {{~#each (without "foo" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
});

test('it returns a new array with given values ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);
  this.set('selectedItems', ['foo', 'bar']);

  this.render(hbs`
    {{~#each (without selectedItems items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'baz', 'should render remaining values');
});

test('it returns the same array when no values are ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);

  this.render(hbs`
    {{~#each (without "missing" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render remaining values');
});

test('it responds to changes', function(assert) {
  this.set('items', emberArray(['foo', 'bar', 'baz']));

  this.render(hbs`
    {{~#each (without "quux" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render all values');

  run(() => this.get('items').pushObject('quux'));
  assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should not render quux');
});

test('it accepts array-like arrays', function(assert) {
  this.set('items', ArrayProxy.create({ content: emberArray(['foo', 'bar', 'baz']) }));

  this.render(hbs`
    {{~#each (without "foo" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
});

test('it accepts an ember data array', function(assert) {
  this.inject.service('store');

  run(() => {
    let person = this.get('store').createRecord('person', {
      name: 'Adam'
    });

    person.get('pets').pushObjects([
      this.get('store').createRecord('pet', { name: 'Kirby' }),
      this.get('store').createRecord('pet', { name: 'Jake' })
    ]);

    this.get('store').createRecord('pet', { name: 'Eva' });

    this.set('person', person);
    this.set('allPets', this.get('store').peekAll('pet'));
  });

  this.render(hbs`
    {{~#each (without person.pets allPets) as |pet|~}}
      {{~pet.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'Eva', 'the remaining pet name is shown');
});
