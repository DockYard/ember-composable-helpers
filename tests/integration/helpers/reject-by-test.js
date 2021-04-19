import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{reject-by}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It reject by value', async function(assert) {
    this.set('array', emberArray([
      { foo: false, name: 'a' },
      { foo: true, name: 'b' },
      { foo: false, name: 'c' }
    ]));

    await render(hbs`
      {{~#each (reject-by 'foo' true this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('It rejects by truthiness', async function(assert) {
    this.set('array', emberArray([
      { foo: 'x', name: 'a' },
      { foo: undefined, name: 'b' },
      { foo: 1, name: 'c' },
      { foo: null, name: 'd' },
      { foo: [1, 2, 3], name: 'e' },
      { foo: false, name: 'f' },
      { foo: 0, name: 'g' },
      { foo: '', name: 'h' },
      { foo: NaN, name: 'i' },
      { foo: [], name: 'j' }
    ]));

    await render(hbs`
      {{~#each (reject-by 'foo' this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('bdfghi', 'a, c, e and j are filtered out');
  });

  test('It recomputes the filter if array changes', async function(assert) {
    let array = emberArray([
      { foo: false, name: 'a' },
      { foo: true, name: 'b' },
      { foo: false, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (reject-by 'foo' true this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ foo: false, name: 'd' }));

    assert.dom().hasText('acd', 'd is added');
  });

  test('It recomputes the filter if a value under given path changes', async function(assert) {
    let array = emberArray([
      { foo: false, name: 'a' },
      { foo: true, name: 'b' },
      { foo: false, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (reject-by 'foo' this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'ac is shown');

    run(() => set(array.objectAt(1), 'foo', false));

    assert.dom().hasText('abc', 'b is added');
  });

  test('It can be passed an action', async function(assert) {
    this.set('array', emberArray([
      { foo: 1, name: 'a' },
      { foo: 2, name: 'b' },
      { foo: 3, name: 'c' }
    ]));

    this.actions.isEven = (value) => value % 2 === 0;

    await render(hbs`
      {{~#each (reject-by 'foo' (action 'isEven') this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('It respects objects that implement isEqual interface', async function(assert) {
    this.set('firstTarget', {
      isEqual(value) {
        return value === 1;
      }
    });

    this.set('array', emberArray([
      { foo: 1, name: 'a' },
      { foo: 2, name: 'b' },
      { foo: 3, name: 'c' }
    ]));

    await render(hbs`
      {{~#each (reject-by 'foo' this.firstTarget this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('bc', 'a is filtered out');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (reject-by 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
