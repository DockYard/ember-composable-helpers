import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{compute}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test("It calls an action and returns it's value", async function(assert) {
    this.actions.square = (x) => x * x;
    await render(hbs`{{compute (action "square") 4}}`);

    assert.equal(find('*').textContent.trim(), '16', '4 squared is 16');
  });
});
