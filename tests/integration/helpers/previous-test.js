import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{previous}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It returns the previous value in an array non-primitive values', async function(assert) {
    this.set('array', emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]));

    this.set('value', { name: 'b' });
    this.set('useDeepEqual', true);

    await render(hbs`
      {{~#with (previous this.value this.useDeepEqual this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('a', 'a is shown');
  });

  test('It returns the previous value in an array of primitive values', async function(assert) {
    this.set('array', emberArray(['lemon', 'kiwi', 'peach']));

    this.set('value', 'peach');

    await render(hbs`
      {{~#with (previous this.value this.array) as |item|~}}
        {{~item~}}
      {{~/with~}}
    `);

    assert.dom().hasText('kiwi', 'kiwi is shown');
  });

  test('It recomputes if array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3]));

    await render(hbs`
      {{~#with (previous 3 this.array) as |item|~}}
        {{~item~}}
      {{~/with~}}
    `);

    assert.dom().hasText('2', '2 is shown');

    run(() => this.set('array', [2, 1, 3]));

    assert.dom().hasText('1', '1 is added and shown');
  });

  test('It returns the previous value in an array of related models', async function(assert) {
    const store = this.owner.lookup('service:store');

    let person = store.createRecord('person', {
      name: 'Adam'
    });

    person.get('pets').pushObjects([
      store.createRecord('pet', { name: 'Kirby' }),
      store.createRecord('pet', { name: 'Jake' })
    ]);

    this.set('pets', person.pets.toArray());
    this.set('currentPet', person.get('pets.lastObject'));

    await render(hbs`
      {{~#with (previous this.currentPet this.pets) as |pet|~}}
        {{~pet.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('Kirby', 'the previous pet name is shown');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#with (previous 1 this.array) as |value|}}
        {{value}}
      {{/with}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#with (previous 1 this.array) as |value|}}
        {{value}}
      {{/with}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
