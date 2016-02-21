import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gt', 'Integration | Helper | {{gt}}', {
  integration: true
});

test('(gt 5 4) == true', function(assert) {
  this.render(hbs`{{if (gt 5 4) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(gt 5 4) === true');
});

test('(gt 5 5) == false', function(assert) {
  this.render(hbs`{{if (gt 5 5) "BAD" "GOOD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(gt 5 5) === false');
});
