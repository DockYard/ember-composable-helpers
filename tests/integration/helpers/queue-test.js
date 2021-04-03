import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';

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
      <p>{{value}}</p>
      <button {{action (queue (action "doAThing") (action "process") (action "undoAThing")) value}}>
        Calculate
      </button>
    `);

    assert.equal(find('p').textContent.trim(), '2', 'precond - should render 2');
    await click('button');
    assert.equal(find('p').textContent.trim(), '4', 'should render 4');
  });

  test('it handles promises', async function(assert) {
    this.set('value', 3);
    this.actions.doAThingThatTakesTime = resolve;
    this.actions.process = (x) => this.set('value', x * x);
    await render(hbs`
      <p>{{value}}</p>
      <button {{action (queue (action "doAThingThatTakesTime") (action "process")) value}}>
        Calculate
      </button>
    `);

    assert.equal(find('p').textContent.trim(), '3', 'precond - should render 3');
    run(async () => await click('button'));
    assert.equal(find('p').textContent.trim(), '9', 'should render 9');
  });
});
