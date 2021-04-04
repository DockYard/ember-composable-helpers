import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{filter}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It filters by truthiness', async function(assert) {
    this.set('array', emberArray([
      { foo: 'x',  name: 'a' },
      { foo: undefined, name: 'b' },
      { foo: 1,  name: 'c' },
      { foo: null,  name: 'd' },
      { foo: [1, 2, 3],  name: 'e' }
    ]));

    this.actions.truthyFoo = function({ foo }) {
      return !!foo;
    };

    await render(hbs`
      {{~#each (filter (action "truthyFoo") this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ace', 'b and d are filtered out');
  });

  test('It recomputes the filter if array changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    this.actions.getFoo = function({ foo }) {
      return foo;
    };

    await render(hbs`
      {{~#each (filter (action "getFoo") this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ foo: true, name: 'd' }));

    assert.dom().hasText('acd', 'd is added');
  });

  test('It can be passed an action', async function(assert) {
    this.set('array', emberArray([
      { foo: 1, name: 'a' },
      { foo: 2, name: 'b' },
      { foo: 3, name: 'c' }
    ]));

    this.actions.isOdd = ({ foo }) => foo % 2 !== 0;

    await render(hbs`
      {{~#each (filter (action "isOdd") this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (filter 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (filter 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });


  test('it accepts a fulfilled ember data promise as a value', async function (assert) {
    let store = this.owner.lookup('service:store');
    let person = store.createRecord('person');

    person.get('pets').pushObjects([
      store.createRecord('pet', { name: 'aa' }),
      store.createRecord('pet', { name: 'ab' }),
      store.createRecord('pet', { name: 'bc' }),
    ]);
    let pets = await person.pets;
    this.set('pets', pets);

    this.actions.startsWithA = function({ name }) {
      return name.startsWith('a');
    };

    await render(hbs`
      {{~#each (filter (action "startsWithA") this.pets) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('aaab', 'bc is filtered out');
  });
});
