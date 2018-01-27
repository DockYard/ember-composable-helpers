import { resolve } from 'rsvp';
import { run } from '@ember/runloop';
import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('queue', 'Integration | Helper | {{queue}}', {
  integration: true
});

test('it queues actions', async function(assert) {
  this.on('doAThing', () => null);
  this.on('process', (x) => this.set('value', x * x));
  this.on('undoAThing', () => null);
  this.set('value', 2);
  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (queue (action "doAThing") (action "process") (action "undoAThing")) value}}>
      Calculate
    </button>
  `);

  assert.equal(find('p').textContent.trim(), '2', 'precond - should render 2');
  await click('button');
  assert.equal(find('p').textContent.trim(), '4', 'should render 4');
});

test('it handles promises', function(assert) {
  this.set('value', 3);
  this.on('doAThingThatTakesTime', resolve);
  this.on('process', (x) => this.set('value', x * x));
  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (queue (action "doAThingThatTakesTime") (action "process")) value}}>
      Calculate
    </button>
  `);

  assert.equal(find('p').textContent.trim(), '3', 'precond - should render 3');
  run(async() => await click('button'));
  assert.equal(find('p').textContent.trim(), '9', 'should render 9');
});
