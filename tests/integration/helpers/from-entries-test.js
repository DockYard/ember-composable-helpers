import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | from-entries', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns an object', async function(assert) {
    this.set('inputValue', [['a', 1], ['b', 2]]);

    await render(hbs`{{#each-in (from-entries inputValue) as |k v|}}{{k}}{{v}}{{/each-in}}`);

    assert.equal(this.element.textContent.trim(), 'a1b2');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each-in (from-entries undefined) as |k v|}}{{k v}}{{/each-in}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each-in (from-entries null) as |k v|}}{{k v}}{{/each-in}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
