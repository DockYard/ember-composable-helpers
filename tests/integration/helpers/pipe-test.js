import { reject, resolve } from 'rsvp';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

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
      <p>{{value}}</p>
      <button {{action (pipe (action "add") (action "square") (action "squareRoot")) 2 4}}>
        Calculate
      </button>
    `);

    assert.equal(find('p').textContent.trim(), '0', 'precond - should render 0');
    await click('button');
    assert.equal(find('p').textContent.trim(), '6', 'should render 6');
  });

  test('it handles promises', async function(assert) {
    this.set('value', 0);
    this.actions.add = (x, y) => x + y;
    this.actions.square = (x) => x * x;
    this.actions.squareRoot = (x) => this.set('value', Math.sqrt(x));
    this.actions.resolvify = resolve;
    await render(hbs`
      <p>{{value}}</p>
      <button {{action (pipe (action "add") (action "square") (action "resolvify") (action "squareRoot")) 2 4}}>
        Calculate
      </button>
    `);

    assert.equal(find('p').textContent.trim(), '0', 'precond - should render 0');
    run(async () => await click('button'));
    assert.equal(find('p').textContent.trim(), '6', 'should render 6');
  });
});

test('it supports promise-like exception handling', function(assert) {
  this.set('value', 0);
  this.on('add', (x, y) => x + y);
  this.on('square', (x) => x * x);
  this.on('squareRoot', (x) => this.set('value', Math.sqrt(x)));
  this.on('setError', (e) => this.set('error', e));
  this.on('resolvify', resolve);
  this.on('reject', reject.bind(null, new Error('rejected mid-pipe')));
  this.on('finish', (first, second) => this.set('final', [first, second]));

  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe
      (action "add")
      (action "square")
      (action "resolvify")
      (action "reject")
      (action "squareRoot")
      catch=(action "setError")
      finally=(action "finish")
    ) 2 4}}>
      Calculate
    </button>
  `);

  assert.notOk(this.get('final'), 'precond - no final value present yet');
  assert.notOk(this.get('error.message'), 'precond - no error present yet');
  assert.equal(find('p').textContent.trim(), '0', 'precond - should render 0');

  run(async() => await click('button'));

  assert.equal(find('p').textContent.trim(), '0', 'should render 6');
  assert.equal(this.get('error.message'), 'rejected mid-pipe', 'was caught by the named argument');
  assert.deepEqual(this.get('final'), [2, 4], 'was caught by the named argument');
});
