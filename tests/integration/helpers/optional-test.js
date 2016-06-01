import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('optional', 'Integration | Helper | {{optional}}', {
  integration: true
});

test('If the action does not exist, it passes a no-op function', function(assert) {
  assert.expect(0);
  this.render(hbs`<button onclick={{action (optional handler)}}></button> `);
  run(() => this.$('button').click());
});

test('If the action does exist, it passes the given action', function(assert) {
  assert.expect(1);
  this.set('handler', () => assert.ok(true));
  this.render(hbs`<button onclick={{action (optional handler)}}></button> `);
  run(() => this.$('button').click());
});

test('Works in a pipe', function(assert) {
  assert.expect(1);
  this.on('check', (value) => assert.equal(value, 42));
  this.render(hbs`
    <button onclick={{action (pipe (action (optional handler)) (action "check")) 42}}></button> `);
  run(() => this.$('button').click());
});
