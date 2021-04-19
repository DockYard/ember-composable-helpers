import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{map}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It maps by value', async function(assert) {
    this.set('array', emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]));

    this.actions.getName = function({ name }) {
      return name;
    };

    await render(hbs`
      {{~#each (map (action "getName") this.array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'name property is mapped');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]);

    this.set('array', array);

    this.actions.getName = function({ name }) {
      return name;
    };

    await render(hbs`
      {{~#each (map (action "getName") this.array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'precondition');

    run(() => array.pushObject({ name: 'd' }));

    assert.dom().hasText('abcd', 'd is added');
  });

  test('it allows null array', async function (assert) {
    this.actions.getName = function({ name }) {
      return name;
    };
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (map (action "getName") this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.actions.getName = function({ name }) {
      return name;
    };
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (map (action "getName") this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
