import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toggle', 'Integration | Helper | {{toggle}}', {
  integration: true
});

test('it toggles the property', async function(assert) {
  this.set('isExpanded', false);
  this.render(hbs`
    <button {{action (toggle "isExpanded" this)}}>
      {{if isExpanded "I am expanded" "I am not"}}
    </button>
  `);
  await click('button');

  assert.equal(find('*').textContent.trim(), 'I am expanded', 'should be expanded');
});

test('it rotates between values', async function(assert) {
  this.set('currentName', 'foo');
  this.render(hbs`
    <button {{action (toggle "currentName" this "foo" "bar" "baz")}}>
      {{currentName}}
    </button>
  `);

  assert.equal(find('*').textContent.trim(), 'foo', 'precondition');
  await click('button');
  assert.equal(find('*').textContent.trim(), 'bar', 'should toggle value');
  await click('button');
  assert.equal(find('*').textContent.trim(), 'baz', 'should toggle value');
  await click('button');
  assert.equal(find('*').textContent.trim(), 'foo', 'should toggle value');
});

test('it handles current value not being in the array of values', async function(assert) {
  this.set('currentName', 'meow');
  this.render(hbs`
    <button {{action (toggle "currentName" this "foo" "bar")}}>
      {{currentName}}
    </button>
  `);

  assert.equal(find('*').textContent.trim(), 'meow', 'precondition');
  await click('button');
  assert.equal(find('*').textContent.trim(), 'foo', 'should fallback to first value');
});
