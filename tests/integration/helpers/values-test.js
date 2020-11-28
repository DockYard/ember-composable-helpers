import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | values', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns object values', async function(assert) {
    this.set('inputValue', {a: 1, b: 2});

    await render(hbs`{{#each (values inputValue) as |v|}}{{v}}{{/each}}`);

    assert.equal(this.element.textContent.trim(), '12');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (values undefined) as |v|}}{{v}}{{/each}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each (values null) as |v|}}{{v}}{{/each}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
