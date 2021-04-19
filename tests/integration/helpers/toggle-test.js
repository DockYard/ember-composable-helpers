import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{toggle}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it toggles the property', async function(assert) {
    this.set('isExpanded', false);
    await render(hbs`
      <button {{action (toggle "isExpanded" this)}}>
        {{if this.isExpanded "I am expanded" "I am not"}}
      </button>
    `);
    await click('button');

    assert.dom().hasText('I am expanded', 'should be expanded');
  });

  test('it rotates between values', async function(assert) {
    this.set('currentName', 'foo');
    await render(hbs`
      <button {{action (toggle "currentName" this "foo" "bar" "baz")}}>
        {{this.currentName}}
      </button>
    `);

    assert.dom().hasText('foo', 'precondition');
    await click('button');
    assert.dom().hasText('bar', 'should toggle value');
    await click('button');
    assert.dom().hasText('baz', 'should toggle value');
    await click('button');
    assert.dom().hasText('foo', 'should toggle value');
  });

  test('it handles current value not being in the array of values', async function(assert) {
    this.set('currentName', 'meow');
    await render(hbs`
      <button {{action (toggle "currentName" this "foo" "bar")}}>
        {{this.currentName}}
      </button>
    `);

    assert.dom().hasText('meow', 'precondition');
    await click('button');
    assert.dom().hasText('foo', 'should fallback to first value');
  });
});
