import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

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
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abcc', 'cabc is sorted to abcc');
  });

  test('It sorts by multiletter words ascending', async function(assert) {
    this.set('array', [
      { name: 'Aa' },
      { name: 'aA' },
      { name: 'cB' },
      { name: 'bc' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('AaaAbccB', 'sorts multiletter words');
  });

  test('It sorts by multiletter words descending', async function(assert) {
    this.set('array', [
      { name: 'Aa' },
      { name: 'aA' },
      { name: 'bc' },
      { name: 'cb' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name:desc' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('cbbcAaaA', 'sorts multiletter words');
  });

  test('It sorts by a value Numbers strings', async function(assert) {
    this.set('array', [
      { value: '1' },
      { value: '0' },
      { value: '1' },
      { value: '2' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'value' this.array) as |user|~}}
        {{~user.value~}}
      {{~/each~}}
    `);

    assert.dom().hasText('0112', 'numbes are sorted');
  });

  test('It sorts by a value Number', async function(assert) {
    this.set('array', [
      { value: 1 },
      { value: 0 },
      { value: 1 },
      { value: 2 }
    ]);

    await render(hbs`
      {{~#each (sort-by 'value' this.array) as |user|~}}
        {{~user.value~}}
      {{~/each~}}
    `);

    assert.dom().hasText('0112', 'numbes are sorted');
  });

  test('It sorts by a value based on Alphabetical (vs ASCII-betical)', async function(assert) {
    this.set('array', [
      { name: 'c' },
      { name: 'C' },
      { name: 'b' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('bcC', 'outputs alphabetical ordering with b before c');
  });

  skip('It sorts by a value based on Alphanumeric', async function(assert) {
    this.set('array', [
      { name: 'c1' },
      { name: 'c11' },
      { name: 'c2' },
      { name: 'c100' }
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('c1c2c11c100', 'alpha numeric is sorted properly');
  });

  test('It sorts by a value with EmberArray', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'cab is sorted to abc');
  });

  test('It sorts by a value desc', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' },
      { name: 'a' }
    ]));

    await render(hbs`
      {{~#each (sort-by 'name:desc' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('cbaa', 'caba is sorted to cbaa');
  });

  test('It does not sort the array when the key is an empty string', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    await render(hbs`
      {{~#each (sort-by "" this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('cab', 'cab is unsorted');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([
      { name: 'b' },
      { name: 'a' },
      { name: 'd' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ name: 'c' }));

    assert.dom().hasText('abcd', 'list is still sorted after addition');
  });

  test('It accepts an array of sort properties (one prop)', async function(assert) {
    this.set('array', emberArray([
      { name: 'c' },
      { name: 'a' },
      { name: 'b' }
    ]));

    this.set('sortBy', ['name']);

    await render(hbs`
      {{~#each (sort-by this.sortBy this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'cab is sorted to abc');
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
      {{~#each (sort-by this.sortBy this.array) as |user|~}}
        {{~user.lastName~}},{{~user.firstName~}};
      {{~/each~}}
    `);

    assert.dom().hasText(
      'Abrams,William;Brady,Donnie;Coda,Adam;Jones,Billy;Jones,Sam;',
      'Names are sorted alphabetically by last name then first name'
    );
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
      {{~#each (sort-by "lastName" "firstName" this.array) as |user|~}}
        {{~user.lastName~}},{{~user.firstName~}};
      {{~/each~}}
    `);

    assert.dom().hasText(
      'Abrams,William;Brady,Donnie;Coda,Adam;Jones,Billy;Jones,Sam;',
      'Names are sorted alphabetically by last name then first name'
    );
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
      {{~#each (sort-by (action "sortBy") this.array) as |user|~}}
        {{~user.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'cab is sorted to abc');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (sort-by 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
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
      {{~#each (sort-by 'name' this.pets) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'cab is sorted to abc');
  });

  test('it sorts undefined values last', async function(assert) {
    this.set('array', [
      { id: 1, name: 'c' },
      { id: 2, name: 'a' },
      { id: 3, name: undefined },
      { id: 4, name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.dom().hasText('2413');
  });

  test('it sorts null values last', async function(assert) {
    this.set('array', [
      { id: 1, name: 'c' },
      { id: 2, name: 'a' },
      { id: 3, name: null },
      { id: 4, name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.dom().hasText('2413');
  });

  test('It maintains order when values are the same', async function(assert) {
    this.set('array', [
      { id: 1, name: 'a' },
      { id: 2, name: 'a' },
      { id: 3, name: 'a' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.dom().hasText('123');
  });

  test('it support undefined array values', async function(assert) {
    this.set('array', [
      { id: 1, name: 'c' },
      { id: 2, name: 'a' },
      undefined,
      { id: 4, name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.dom().hasText('241');
  });

  test('it support null array values', async function(assert) {
    this.set('array', [
      { id: 1, name: 'c' },
      { id: 2, name: 'a' },
      null,
      { id: 4, name: 'b' },
    ]);

    await render(hbs`
      {{~#each (sort-by 'name' this.array) as |user|~}}
        {{~user.id~}}
      {{~/each~}}
    `);

    assert.dom().hasText('241');
  });

  test('it sorts asc by a few params some of those are all null', async function(assert) {
    this.set('array', [
      { creationDate: null, attrs: { trialNumber: '00-01'}, localOrder: 1 },
      { creationDate: null, attrs: { trialNumber: '00-02'}, localOrder: 2 },      
    ]);

    await render(hbs`
      {{~#each (sort-by 'creationDate:asc' 'attrs.trialNumber:asc' 'localOrder' this.array) as |trial|~}}
        {{~trial.attrs.trialNumber~}}
      {{~/each~}}
    `);

    assert.dom().hasText('00-0100-02');
  })

  test('it sorts desc by a few params some of those are all null', async function(assert) {
    this.set('array', [      
      { creationDate: null, attrs: { trialNumber: '00-02'}, localOrder: 1 },
      { creationDate: null, attrs: { trialNumber: '00-01'}, localOrder: 2 },
    ]);

    await render(hbs`
      {{~#each (sort-by 'creationDate:desc' 'attrs.trialNumber:desc' 'localOrder' this.array) as |trial|~}}
        {{~trial.attrs.trialNumber~}}
      {{~/each~}}
    `);

    assert.dom().hasText('00-0200-01');
  })
});
