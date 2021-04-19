import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{queue}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it queues actions', async function(assert) {
    this.actions.doAThing = () => null;
    this.actions.process = (x) => this.set('value', x * x);
    this.actions.undoAThing = () => null;
    this.set('value', 2);
    await render(hbs`
      <p>{{this.value}}</p>
      <button {{action (queue (action "doAThing") (action "process") (action "undoAThing")) this.value}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('2', 'precond - should render 2');
    await click('button');
    assert.dom('p').hasText('4', 'should render 4');
  });

  test('it handles promises', async function(assert) {
    this.set('value', 3);
    this.actions.doAThingThatTakesTime = resolve;
    this.actions.process = (x) => this.set('value', x * x);
    await render(hbs`
      <p>{{this.value}}</p>
      <button {{action (queue (action "doAThingThatTakesTime") (action "process")) this.value}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('3', 'precond - should render 3');
    await click('button');
    assert.dom('p').hasText('9', 'should render 9');
  });
});
