import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{take}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It takes the first N entries of array', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4, 5]));

    await render(hbs`
      {{~#each (take 2 array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '12', 'first two values are kept');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([1, 2, 3, 4, 5]);
    this.set('array', array);

    await render(hbs`
      {{~#each (take 2 array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    run(() => array.unshiftObject(0));

    assert.equal(find('*').textContent.trim(), '01', '0 and 1 are kept');
  });

  test('It allows null arrays', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{~#each (take 2 array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render');
  });
});
