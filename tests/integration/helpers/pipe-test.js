import { resolve } from 'rsvp';
import { run } from '@ember/runloop';
import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pipe', 'Integration | Helper | {{pipe}}', {
  integration: true
});

test('it pipes actions', async function(assert) {
  this.set('value', 0);
  this.on('add', (x, y) => x + y);
  this.on('square', (x) => x * x);
  this.on('squareRoot', (x) => this.set('value', Math.sqrt(x)));
  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe (action "add") (action "square") (action "squareRoot")) 2 4}}>
      Calculate
    </button>
  `);

  assert.equal(find('p').textContent.trim(), '0', 'precond - should render 0');
  await click('button');
  assert.equal(find('p').textContent.trim(), '6', 'should render 6');
});

test('it handles promises', function(assert) {
  this.set('value', 0);
  this.on('add', (x, y) => x + y);
  this.on('square', (x) => x * x);
  this.on('squareRoot', (x) => this.set('value', Math.sqrt(x)));
  this.on('resolvify', resolve);
  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe (action "add") (action "square") (action "resolvify") (action "squareRoot")) 2 4}}>
      Calculate
    </button>
  `);

  assert.equal(find('p').textContent.trim(), '0', 'precond - should render 0');
  run(async() => await click('button'));
  assert.equal(find('p').textContent.trim(), '6', 'should render 6');
});
