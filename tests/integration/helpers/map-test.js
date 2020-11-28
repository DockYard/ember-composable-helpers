import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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
      {{~#each (map (action "getName") array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'name property is mapped');
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
      {{~#each (map (action "getName") array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'precondition');

    run(() => array.pushObject({ name: 'd' }));

    assert.equal(find('*').textContent.trim(), 'abcd', 'd is added');
  });

  test('it allows null array', async function (assert) {
    this.actions.getName = function({ name }) {
      return name;
    };
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (map (action "getName") array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.actions.getName = function({ name }) {
      return name;
    };
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (map (action "getName") array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
