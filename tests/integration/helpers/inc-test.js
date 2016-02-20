import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inc', 'Integration | Helper | {{inc}}', {
  integration: true
});

test('it increments a value', function(assert) {
  this.render(hbs`{{inc 1}}`);

  assert.equal(this.$().text().trim(), '2', 'should increment by 1');
});

test('it increments a value', function(assert) {
  this.render(hbs`{{inc 1 2}}`);

  assert.equal(this.$().text().trim(), '3', 'should increment by 2');
});
