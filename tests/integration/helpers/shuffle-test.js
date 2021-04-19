import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{shuffle}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('It shuffles array', async function(assert) {
    this.set('array', emberArray([1, 2]));
    await render(hbs`
      {{~#each (shuffle this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText(/12|21/, 'array is shuffled')
  });

  test('It shuffles array using passed in randomizer', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4]));
    this.actions.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle (action "fake") this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
  });

  test('It handles a non-ember array', async function(assert) {
    this.set('array', [1, 2, 3, 4]);
    this.actions.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle (action "fake") this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
  });

  test('It does not mutate the original array', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4]));
    this.actions.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle (action "fake") this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
    assert.deepEqual(this.get('array'), [1, 2, 3, 4], 'the original array is not shuffled');
  });

  test('It gracefully handles non-array values', async function(assert) {
    this.set('notArray', 1);
    await render(hbs`
      {{~#each (shuffle this.notArray) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('1', 'the non array value is rendered');
  });

  test('It recomputes the shuffle if the array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4]));
    this.actions.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle (action "fake") this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');

    this.set('array', emberArray(['a', 2, 3, 4]));

    assert.dom().hasText('234a', 'array is shuffled');
  });

  test('It recomputes the shuffle if an item in the array changes', async function(assert) {
    let array = emberArray([1, 2, 3, 4]);
    this.set('array', array);
    this.actions.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle (action "fake") this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');

    run(() => array.replace(2, 1, [5]));

    assert.dom().hasText('2541', 'array is shuffled');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (shuffle this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (shuffle this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
