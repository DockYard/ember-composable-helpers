import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{drop}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It drops the first N entries of array', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4, 5]));

    await render(hbs`
      {{~#each (drop 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.dom().hasText('345', 'first two values are dropped');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([1, 2, 3, 4, 5]);
    this.set('array', array);

    await render(hbs`
      {{~#each (drop 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    run(() => array.unshiftObject(0));

    assert.dom().hasText('2345', '0 and 1 are dropped');
  });

  test('It allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (drop 2 this.array) as |n|}}
        {{n}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
