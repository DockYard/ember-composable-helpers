import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('classify', 'Integration | Helper | {{classify}}', {
  integration: true
});

test('It converts camelCase correctly', function(assert) {
  this.render(hbs`{{classify "andAnother"}}`);

  let expected = 'AndAnother';

  assert.equal(this.$().text().trim(), expected, 'classifies camelCased strings');
});

test('It converts underscored strings correctly', function(assert) {
  this.render(hbs`{{classify "harry_potter"}}`);

  let expected = 'HarryPotter';

  assert.equal(this.$().text().trim(), expected, 'classifies underscored strings');
});

test('It converts spaces in strings correctly', function(assert) {
  this.render(hbs`{{classify "age is foolish and forgetful when it underestimates youth"}}`);

  let expected = 'AgeIsFoolishAndForgetfulWhenItUnderestimatesYouth';

  assert.equal(this.$().text().trim(), expected, 'classifies strings with spaces');
});

test('It correctly handles empty string input', function(assert) {
  this.render(hbs`{{classify ""}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if input is empty string');
});

test('It correctly handles undefined input', function(assert) {
  this.render(hbs`{{classify undefined}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if undefined input');
});
