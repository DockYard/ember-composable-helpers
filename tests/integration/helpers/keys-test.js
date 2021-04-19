import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | keys', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns the keys', async function(assert) {
    let object = {
      a: 1,
      b: 2
    }

    this.set('object', object);

    await render(hbs`{{#each (keys this.object) as |key|}}{{key}}{{/each}}`);

    assert.dom().hasText('ab');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (keys undefined) as |key|}}{{key}}{{/each}}
    `);

    assert.dom().hasText('');
  });

  test('it works with let helper', async function(assert) {
    let object = {
      a: 1,
      b: 2
    }

    this.set('object', object);

    await render(hbs`
      {{#let (keys this.object) as |objectKeys|}}
        {{objectKeys.length}}
      {{/let}}
    `);

    assert.dom().hasText('2');
  });
});
