import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{pipe-action}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it can be used as a closure action', async function(assert) {
    let value = 0;
    this.actions.add = (x, y) => x + y;
    this.actions.square = (x) => x * x;
    this.actions.squareRoot = (x) => value = Math.sqrt(x);
    await render(hbs`
      {{perform-calculation
          calculate=(pipe-action
            (action "add")
            (action "square")
            (action "squareRoot"))
      }}
    `);

    assert.equal(value, '0', 'precond - should render 0');
    await click('button');
    assert.equal(value, '6', 'should render 6');
  });
});
