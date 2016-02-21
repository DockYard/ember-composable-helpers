import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt', 'Integration | Helper | {{lt}}', {
  integration: true
});

test('(lt 4 5) == true', function(assert) {
  this.render(hbs`{{if (lt 4 5) "GOOD" "BAD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(lt 4 5) === true');
});

test('(lt 5 5) == false', function(assert) {
  this.render(hbs`{{if (lt 5 5) "BAD" "GOOD"}}`);
  assert.equal(this.$().text().trim(), 'GOOD', '(lt 5 5) === false');
});

