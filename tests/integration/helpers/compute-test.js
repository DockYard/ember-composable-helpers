import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{compute}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test("It calls an action and returns it's value", async function(assert) {
    this.actions.square = (x) => x * x;
    await render(hbs`{{compute (action "square") 4}}`);

    assert.dom().hasText('16', '4 squared is 16');
  });
});
