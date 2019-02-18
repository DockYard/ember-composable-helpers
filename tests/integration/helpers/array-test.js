import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{array}}', function(hooks) {
  setupRenderingTest(hooks);

  test('creates array object in template', async function(assert) {
    await render(hbs`
      {{~#each (array 1 2 3) as |number|~}}
        {{number}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123', 'creates array object in template');
  });

  test('has length property', async function(assert) {
    await render(hbs`
      {{~#with (array 1 2 3 5) as |a|~}}
        {{a.length}}
      {{~/with~}}
    `);

    assert.equal(find('*').textContent.trim(), '4', 'length is accessible');
  });

  test('re-evaluates when parameter changes', async function(assert) {
    await render(hbs`
      {{~#each (array 1 2 dynamic 3) as |number|~}}
        {{number}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '123', 'dynamic is not included when undefined');

    this.set('dynamic', 'π');
    assert.equal(find('*').textContent.trim(), '12π3', 'dynamic is included');
  });

  test('if evaluates empty array to false', async function(assert) {
    await render(hbs`
      {{~if (array) 'true' 'false'~}}
    `);
    assert.equal(find('*').textContent.trim(), 'false', 'empty array evaluates to false in .hbs template');
  });
});
