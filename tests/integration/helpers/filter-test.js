import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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
      {{~#each (filter (action "truthyFoo") array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ace', 'b and d are filtered out');
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
      {{~#each (filter (action "getFoo") array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ foo: true, name: 'd' }));

    assert.equal(find('*').textContent.trim(), 'acd', 'd is added');
  });

  test('It can be passed an action', async function(assert) {
    this.set('array', emberArray([
      { foo: 1, name: 'a' },
      { foo: 2, name: 'b' },
      { foo: 3, name: 'c' }
    ]));

    this.actions.isOdd = ({ foo }) => foo % 2 !== 0;

    await render(hbs`
      {{~#each (filter (action "isOdd") array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
  });
});
