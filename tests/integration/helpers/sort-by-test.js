import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{sort-by}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It sorts by a value ascending', async function(assert) {
    this.set('array', [
      { name: 'c' },
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abcc', 'cabc is sorted to abcc');
  });

  test('It sorts by multiletter words ascending', async function(assert) {
    this.set('array', [
      { name: 'Aa' },
      { name: 'aA' },
      { name: 'cB' },
      { name: 'bc' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'AaaAbccB', 'sorts multiletter words');
  });

  test('It sorts by multiletter words descending', async function(assert) {
    this.set('array', [
      { name: 'Aa' },
      { name: 'aA' },
      { name: 'bc' },
      { name: 'cb' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name:desc' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'cbbcAaaA', 'sorts multiletter words');
  });

  test('It sorts by a value Numbers strings', async function(assert) {
    this.set('array', [
      { value: '1' },
      { value: '0' },
      { value: '1' },
      { value: '2' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'value' array) as |user|~}}
        {{~user.value~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '0112', 'numbes are sorted');
  });

  test('It sorts by a value Number', async function(assert) {
    this.set('array', [
      { value: 1 },
      { value: 0 },
      { value: 1 },
      { value: 2 }
    ]);

    await render(hbs`
      {{~#each (sort-by 'value' array) as |user|~}}
        {{~user.value~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '0112', 'numbes are sorted');
  });

  test('It sorts by a value based on Alphabetical (vs ASCII-betical)', async function(assert) {
    this.set('array', [
      { name: 'c' },
      { name: 'C' },
      { name: 'b' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'bcC', 'outputs alphabetical ordering with b before c');
  });

  skip('It sorts by a value based on Alphanumeric', async function(assert) {
    this.set('array', [
      { name: 'c1' },
      { name: 'c11' },
      { name: 'c2' },
      { name: 'c100' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'c1c2c11c100', 'alpha numeric is sorted properly');
  });

  test('It sorts by a value with EmberArray', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'cab is sorted to abc');
  });

  test('It sorts by a value desc', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' },
      { name: 'a' }
    ]));

    await render(hbs`
      {{~#each (sort-by 'name:desc' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'cbaa', 'caba is sorted to cbaa');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([
      { name: 'b' },
      { name: 'a' },
      { name: 'd' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ name: 'c' }));

    assert.equal(find('*').textContent.trim(), 'abcd', 'list is still sorted after addition');
  });

  test('It accepts an array of sort properties (one prop)', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    this.set('sortBy', ['name']);

    await render(hbs`
      {{~#each (sort-by sortBy array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'cab is sorted to abc');
  });

  test('It accepts an array of sort properties (more than one prop)', async function(assert) {
    this.set('array', emberArray([
      { firstName: 'Adam', lastName: 'Coda' },
      { firstName: 'Billy', lastName: 'Jones' },
      { firstName: 'William', lastName: 'Abrams' },
      { firstName: 'Sam', lastName: 'Jones' },
      { firstName: 'Donnie', lastName: 'Brady' }
    ]));

    this.set('sortBy', ['lastName', 'firstName']);

    await render(hbs`
      {{~#each (sort-by sortBy array) as |user|~}}
        {{~user.lastName~}},{{~user.firstName~}};
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'Abrams,William;Brady,Donnie;Coda,Adam;Jones,Billy;Jones,Sam;', 'Names are sorted alphabetically by last name then first name');
  });

  test('It accepts multiple sort properties as helper params', async function(assert) {
    this.set('array', emberArray([
      { firstName: 'Adam', lastName: 'Coda' },
      { firstName: 'Billy', lastName: 'Jones' },
      { firstName: 'William', lastName: 'Abrams' },
      { firstName: 'Sam', lastName: 'Jones' },
      { firstName: 'Donnie', lastName: 'Brady' }
    ]));

    await render(hbs`
      {{~#each (sort-by "lastName" "firstName" array) as |user|~}}
        {{~user.lastName~}},{{~user.firstName~}};
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'Abrams,William;Brady,Donnie;Coda,Adam;Jones,Billy;Jones,Sam;', 'Names are sorted alphabetically by last name then first name');
  });

  test('It accepts a function sort property', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    this.actions.sortBy = (a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }

      return 0;
    };

    await render(hbs`
      {{~#each (sort-by (action "sortBy") array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'cab is sorted to abc');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (sort-by 'name' array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });

  test('it accepts a fulfilled ember data promise as a value', async function (assert) {
    let store = this.owner.lookup('service:store');
    let person = store.createRecord('person');

    person.get('pets').pushObjects([
      store.createRecord('pet', { name: 'c' }),
      store.createRecord('pet', { name: 'b' }),
      store.createRecord('pet', { name: 'a' }),
    ]);
    let pets = await person.pets;

    this.set('pets', pets);

    await render(hbs`
      {{~#each (sort-by 'name' pets) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'cab is sorted to abc');
  });

  test('ignores undefined values sorting', async function (assert) {
    this.set('array', [
      { name: 'c' },
      { name: 'a' },
      { name: undefined },
      { name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc');
  });

  test('it sorts null values last', async function(assert) {
    this.set('array', [
      { id: 1, name: 'c' },
      { id: 2, name: 'a' },
      { id: 3, name: null },
      { id: 4, name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '2413');
  });

  test('It maintains order when values are the same', async function(assert) {
    this.set('array', [
      { id: 1, name: 'a' },
      { id: 2, name: 'a' },
      { id: 3, name: 'a' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123');
  });
});
