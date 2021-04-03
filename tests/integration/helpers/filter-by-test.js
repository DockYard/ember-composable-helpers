import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Helper | {{filter-by}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It filters by value', async function(assert) {
    this.set('array', emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]));

    await render(hbs`
      {{~#each (filter-by 'foo' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
  });

  test('It filters by truthiness', async function(assert) {
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
      {{~#each (filter-by 'foo' array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'acej', 'b, d, f, g, h and i are filtered out');
  });

  test('It recomputes the filter if array changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (filter-by 'foo' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ foo: true, name: 'd' }));

    assert.equal(find('*').textContent.trim(), 'acd', 'd is added');
  });

  test('It recomputes the filter if a value under given path changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (filter-by 'foo' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => set(array.objectAt(1), 'foo', true));

    assert.equal(find('*').textContent.trim(), 'abc', 'b is shown');
  });

  test('It recomputes the filter with a falsy value', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (filter-by 'foo' false array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    run(() => set(array.objectAt(0), 'foo', false));

    assert.equal(find('*').textContent.trim(), 'ab', 'a and b are shown');
  });

  test('It recomputes the filter with no value', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (filter-by 'foo' array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ac', 'ac is shown');

    run(() => set(array.objectAt(1), 'foo', true));

    assert.equal(find('*').textContent.trim(), 'abc', 'b is added');
  });

  test('It can be passed an action', async function(assert) {
    this.set('array', emberArray([
      { foo: 1, name: 'a' },
      { foo: 2, name: 'b' },
      { foo: 3, name: 'c' }
    ]));

    this.actions.isOdd = (value) => value % 2 === 1;

    await render(hbs`
      {{~#each (filter-by 'foo' (action 'isOdd') array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
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
      {{~#each (filter-by 'foo' firstTarget array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'a', 'b and c are filtered out');
  });

  test('It filters without dependant keys', async function(assert) {
    this.set('array', emberArray([
      { foo: { bar: true, }, name: 'a' },
      { foo: { bar: false, }, name: 'b' },
      { foo: { bar: true, }, name: 'c' }
    ]));

    await render(hbs`
      {{~#each (filter-by 'foo.bar' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'ac', 'b is filtered out');
  });

  test('It handles null arrays', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this will be empty:
      {{~#each (filter-by 'foo.bar' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'this will be empty:');
  });

  test('It handles undefined arrays', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this will be empty:
      {{~#each (filter-by 'foo.bar' true array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'this will be empty:');
  });
});
