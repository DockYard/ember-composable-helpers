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
