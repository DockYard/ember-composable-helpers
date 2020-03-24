import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | keys', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns the keys', async function(assert) {
    let object = {
      a: 1,
      b: 2
    }

    this.set('object', object);

    await render(hbs`{{#each (keys object) as |key|}}{{key}}{{/each}}`);

    assert.equal(find('*').textContent.trim(), 'ab');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (keys undefined) as |key|}}{{key}}{{/each}}
    `);

    assert.equal(find('*').textContent.trim(), '');
  });

  test('it works with let helper', async function(assert) {
    let object = {
      a: 1,
      b: 2
    }

    this.set('object', object);

    await render(hbs`
      {{#let (keys object) as |objectKeys|}}
        {{objectKeys.length}}
      {{/let}}
    `);

    assert.equal(find('*').textContent.trim(), '2');
  });
});
