import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{drop}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It drops the first N entries of array', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4, 5]));

    await render(hbs`
      {{~#each (drop 2 array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '345', 'first two values are dropped');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([1, 2, 3, 4, 5]);
    this.set('array', array);

    await render(hbs`
      {{~#each (drop 2 array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    run(() => array.unshiftObject(0));

    assert.equal(find('*').textContent.trim(), '2345', '0 and 1 are dropped');
  });

  test('It allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (drop 2 array) as |n|}}
        {{n}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
