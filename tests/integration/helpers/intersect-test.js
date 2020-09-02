import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{intersect}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It takes the intersection of the given arrays', async function(assert) {
    this.set('array1', ['foo', 'bar']);
    this.set('array2', ['foo', 'baz']);
    this.set('array3', ['qux', 'foo']);

    await render(hbs`
      {{~#each (intersect array1 array2 array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foo', 'intersect shows words common to all arrays');
  });

  test('It watches for changes', async function(assert) {
    this.set('array1', emberArray(['foo', 'bar']));
    this.set('array2', emberArray(['foo', 'baz']));
    this.set('array3', emberArray(['qux', 'foo']));

    await render(hbs`
      {{~#each (intersect array1 array2 array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    run(() => this.get('array2').pushObject('bar'));
    run(() => this.get('array3').pushObject('bar'));

    assert.equal(find('*').textContent.trim(), 'foobar', 'bar is added');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (intersect array array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });

  test('it accepts an ember data array', async function(assert) {
    let store = this.owner.lookup('service:store');
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

    await this.render(hbs`
      {{~#each (intersect person.pets allPets) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.equal(this.element.textContent.trim(), 'KirbyJake', 'the pets belonging to the person are shown');
  });
});
