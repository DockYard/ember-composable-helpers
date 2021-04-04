import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{flatten}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it flattens an array', async function(assert) {
    await render(hbs`
      {{#each (flatten (repeat 3 (range 1 3 true))) as |number|}}{{number}}{{/each}}
    `);

    assert.dom().hasText('123123123', 'should handle a single level depth array');
  });

  test('it flattens an array of arrays', async function(assert) {
    this.set('array', [1, [2, 3], [4, [5, 6]]]);
    await render(hbs`
      {{#each (flatten this.array) as |number|}}{{number}}{{/each}}
    `);

    assert.dom().hasText('123456', 'should handle multi level depth array');
  });

  test('it handles empty array', async function(assert) {
    this.set('array', []);
    await render(hbs`
      {{#each (flatten this.array) as |number|}}{{number}}{{/each}}
    `);

    assert.dom().hasText('', 'should handle an empty array');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each (flatten null) as |number|}}{{number}}{{/each}}
    `);

    assert.dom().hasText('', 'should handle null input');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (flatten undefined) as |number|}}{{number}}{{/each}}
    `);

    assert.dom().hasText('', 'should handle undefined input');
  });
});
