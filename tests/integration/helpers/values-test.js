import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | values', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns object values', async function(assert) {
    this.set('inputValue', {a: 1, b: 2});

    await render(hbs`{{#each (values this.inputValue) as |v|}}{{v}}{{/each}}`);

    assert.dom(this.element).hasText('12');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (values undefined) as |v|}}{{v}}{{/each}}
    `);

    assert.dom(this.element).hasText('');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each (values null) as |v|}}{{v}}{{/each}}
    `);

    assert.dom(this.element).hasText('');
  });
});
