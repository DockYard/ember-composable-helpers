import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dec', 'Integration | Helper | {{dec}}', {
  integration: true
});

test('it decrements a value', function(assert) {
  this.render(hbs`{{dec 3}}`);

  assert.equal(this.$().text().trim(), '2', 'should decrement by 1');
});

test('it decrements a value', function(assert) {
  this.render(hbs`{{dec 2 5}}`);

  assert.equal(this.$().text().trim(), '3', 'should decrement by 2');
});
