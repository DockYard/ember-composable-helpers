import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{toggle-action}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it can be used as a closure action', async function(assert) {
    this.set('isExpanded', false);

    await render(hbs`
      <p>{{if this.isExpanded "I am expanded" "I am not"}}</p>
      <button {{on "click" (toggle "isExpanded" this)}}>
        Toggle
      </button>
    `);

    await click('button');

    assert.dom('p').hasText('I am expanded', 'should be expanded');
  });
});
