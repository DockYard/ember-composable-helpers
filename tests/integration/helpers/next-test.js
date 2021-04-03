import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{next}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It returns the next value in an array of non-primitive values', async function(assert) {
    this.set('array', emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]));

    this.set('value', { name: 'b' });
    this.set('useDeepEqual', true);

    await render(hbs`
      {{~#with (next value useDeepEqual array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('c', 'c is shown');
  });

  test('It returns the next value in an array of primitive values', async function(assert) {
    this.set('array', emberArray(['lemon', 'kiwi', 'peach']));

    this.set('value', 'lemon');

    await render(hbs`
      {{~#with (next value array) as |item|~}}
        {{~item~}}
      {{~/with~}}
    `);

    assert.dom().hasText('kiwi', 'kiwi is shown');
  });

  test('It recomputes if array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3]));

    await render(hbs`
      {{~#with (next 1 array) as |item|~}}
        {{~item~}}
      {{~/with~}}
    `);

    assert.dom().hasText('2', '2 is shown');

    run(() => this.set('array', [2, 1, 3]));

    assert.dom().hasText('3', '3 is added and shown');
  });

  test('It return the next value in an array of related models', async function(assert) {
    this.store = this.owner.lookup('service:store');

    run(() => {
      let person = this.get('store').createRecord('person', {
        name: 'Adam'
      });

      person.get('pets').pushObjects([
        this.get('store').createRecord('pet', { name: 'Kirby' }),
        this.get('store').createRecord('pet', { name: 'Jake' })
      ]);

      this.set('model', person);
      this.set('currentPet', person.get('pets.firstObject'));
    });

    await render(hbs`
      {{~#with (next currentPet model.pets) as |pet|~}}
        {{~pet.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('Jake', 'the next pet name is shown');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{next 1 array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{next 1 array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
