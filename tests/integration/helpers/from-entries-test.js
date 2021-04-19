import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | from-entries', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns an object', async function(assert) {
    this.set('inputValue', [['a', 1], ['b', 2]]);

    await render(hbs`{{#each-in (from-entries this.inputValue) as |k v|}}{{k}}{{v}}{{/each-in}}`);

    assert.dom(this.element).hasText('a1b2');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each-in (from-entries undefined) as |k v|}}{{k v}}{{/each-in}}
    `);

    assert.dom(this.element).hasText('');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each-in (from-entries null) as |k v|}}{{k v}}{{/each-in}}
    `);

    assert.dom(this.element).hasText('');
  });
});
