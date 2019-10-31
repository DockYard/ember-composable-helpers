import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{compact}}', function(hooks) {
  setupRenderingTest(hooks);

  test('Removes empty values in standard arrays', async function(assert) {
    this.set('array', emberArray([1, 2, null, 3, false]));
    await render(hbs`
      {{~#each (compact array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123false', 'null is removed');
  });

  test('It gracefully handles non-array values', async function(assert) {
    this.set('notArray', 1);
    await render(hbs`
      {{~#each (compact notArray) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '1', 'the non array value is rendered');
  });

  test('It recomputes the filter if the array changes', async function(assert) {
    this.set('array', emberArray([1, 2, null, 3]));
    await render(hbs`
      {{~#each (compact array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123', 'null is removed');

    this.set('array', emberArray([1, null, null, 3]));

    assert.equal(find('*').textContent.trim(), '13', 'null is removed');
  });

  test('It recomputes the filter if an item in the array changes', async function(assert) {
    let array = emberArray([1, 2, null, 3]);
    this.set('array', array);
    await render(hbs`
      {{~#each (compact array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123', 'null is removed');

    run(() => array.replace(2, 1, [5]));

    assert.equal(find('*').textContent.trim(), '1253', 'null is removed');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (compact array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
