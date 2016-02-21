import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gte', 'Integration | Helper | {{gte}}', {
  integration: true
});

test('(gt 5 4) == true', function(assert) {
  this.render(hbs`{{if (gte 5 4) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(gte 5 4) === true');
});

test('(gte 5 5) == true', function(assert) {
  this.render(hbs`{{if (gte 5 5) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(gte 5 5) === true');
});

test('(gte 5 6) == false', function(assert) {
  this.render(hbs`{{if (gte 5 6) "BAD" "GOOD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(gte 5 6) === false');
});
