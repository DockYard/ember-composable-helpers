import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('compute', 'Integration | Helper | {{compute}}', {
  integration: true
});

test("It calls an action and returns it's value", function(assert) {
  this.on('square', (x) => x * x);
  this.render(hbs`{{compute (action "square") 4}}`);

  assert.equal(find('*').textContent.trim(), '16', '4 squared is 16');
});
