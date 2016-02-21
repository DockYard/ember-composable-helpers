import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lte', 'Integration | Helper | {{lte}}', {
  integration: true
});

test('(lte 4 5) == true', function(assert) {
  this.render(hbs`{{if (lte 4 5) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(lt 4 5) === true');
});

test('(lte 5 5) == true', function(assert) {
  this.render(hbs`{{if (lte 5 5) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(lt 5 5) === true');
});

test('(lte 6 5) == false', function(assert) {
  this.render(hbs`{{if (lte 6 5) "BAD" "GOOD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(lt 6 5) === false');
});
