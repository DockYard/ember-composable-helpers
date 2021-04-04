import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{pipe}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it pipes actions', async function(assert) {
    this.set('value', 0);
    this.actions.add = (x, y) => x + y;
    this.actions.square = (x) => x * x;
    this.actions.squareRoot = (x) => this.set('value', Math.sqrt(x));
    await render(hbs`
      <p>{{this.value}}</p>
      <button {{action (pipe (action "add") (action "square") (action "squareRoot")) 2 4}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('0', 'precond - should render 0');
    await click('button');
    assert.dom('p').hasText('6', 'should render 6');
  });

  test('it handles promises', async function(assert) {
    this.set('value', 0);
    this.actions.add = (x, y) => x + y;
    this.actions.square = (x) => x * x;
    this.actions.squareRoot = (x) => this.set('value', Math.sqrt(x));
    this.actions.resolvify = resolve;
    await render(hbs`
      <p>{{this.value}}</p>
      <button {{action (pipe (action "add") (action "square") (action "resolvify") (action "squareRoot")) 2 4}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('0', 'precond - should render 0');
    await click('button')
    assert.dom('p').hasText('6', 'should render 6');
  });
});
