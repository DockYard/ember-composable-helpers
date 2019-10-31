import ArrayProxy from '@ember/array/proxy';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{without}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns a new array with given value ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "foo" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
  });

  test('it returns a new array with given values ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);
    this.set('selectedItems', ['foo', 'bar']);

    await render(hbs`
      {{~#each (without selectedItems items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'baz', 'should render remaining values');
  });

  test('it returns the same array when no values are ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "missing" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render remaining values');
  });

  test('it responds to changes', async function(assert) {
    this.set('items', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`
      {{~#each (without "quux" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render all values');

    run(() => this.get('items').pushObject('quux'));
    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should not render quux');
  });

  test('it accepts array-like arrays', async function(assert) {
    this.set('items', ArrayProxy.create({ content: emberArray(['foo', 'bar', 'baz']) }));

    await render(hbs`
      {{~#each (without "foo" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
  });

  test('it accepts an ember data array', async function(assert) {
    let store = this.owner.lookup('service:store');

    run(() => {
      let person = store.createRecord('person', {
        name: 'Adam'
      });

      person.get('pets').pushObjects([
        store.createRecord('pet', { name: 'Kirby' }),
        store.createRecord('pet', { name: 'Jake' })
      ]);

      store.createRecord('pet', { name: 'Eva' });

      this.set('person', person);
      this.set('allPets', store.peekAll('pet'));
    });

    await this.render(hbs`
      {{~#each (without person.pets allPets) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.equal(this.element.textContent.trim(), 'Eva', 'the remaining pet name is shown');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (without 1 array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
