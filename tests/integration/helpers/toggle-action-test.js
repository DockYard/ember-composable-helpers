import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toggle-action', 'Integration | Helper | {{toggle-action}}', {
  integration: true
});

test('it can be used as a closure action', async function(assert) {
  this.set('isExpanded', false);
  this.render(hbs`
    <p>{{if isExpanded "I am expanded" "I am not"}}</p>
    {{toggle-button toggleAction=(toggle "isExpanded" this)}}
  `);

  await click('button');

  assert.equal(find('p').textContent.trim(), 'I am expanded', 'should be expanded');
});
