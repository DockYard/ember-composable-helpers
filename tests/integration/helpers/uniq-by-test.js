import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | uniq-by', function(hooks) {
  setupRenderingTest(hooks);

  test('it filters unique values by key', async function(assert) {
    this.set('array', [
      { name: 'a' },
      { name: 'a' },
      { name: 'b' },
    ]);

    await render(hbs`{{#each (uniq-by "name" this.array) as |item|}}{{item.name}}{{/each}}`);

    assert.equal(this.element.textContent.trim(), 'ab');
  });
});
