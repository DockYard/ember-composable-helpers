import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toggle', 'Integration | Helper | {{toggle}}', {
  integration: true
});

test('it toggles the property', function(assert) {
  this.set('isExpanded', false);
  this.render(hbs`
    <button {{action (toggle "isExpanded" this)}}>
      {{if isExpanded "I am expanded" "I am not"}}
    </button>
  `);
  this.$('button').click();

  assert.equal(this.$().text().trim(), 'I am expanded', 'should be expanded');
});

test('it rotates between values', function(assert) {
  this.set('currentName', 'foo');
  this.render(hbs`
    <button {{action (toggle "currentName" this "foo" "bar" "baz")}}>
      {{currentName}}
    </button>
  `);

  assert.equal(this.$().text().trim(), 'foo', 'precondition');
  this.$('button').click();
  assert.equal(this.$().text().trim(), 'bar', 'should toggle value');
  this.$('button').click();
  assert.equal(this.$().text().trim(), 'baz', 'should toggle value');
  this.$('button').click();
  assert.equal(this.$().text().trim(), 'foo', 'should toggle value');
});

test('it handles current value not being in the array of values', function(assert) {
  this.set('currentName', 'meow');
  this.render(hbs`
    <button {{action (toggle "currentName" this "foo" "bar")}}>
      {{currentName}}
    </button>
  `);

  assert.equal(this.$().text().trim(), 'meow', 'precondition');
  this.$('button').click();
  assert.equal(this.$().text().trim(), 'foo', 'should fallback to first value');
});
