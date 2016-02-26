import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('camelize', 'Integration | Helper | {{camelize}}', {
  integration: true
});

test('It maintains camelCase correctly', function(assert) {
  this.render(hbs`{{camelize "andAnother"}}`);

  let expected = 'andAnother';

  assert.equal(this.$().text().trim(), expected, 'maintains camelCase');
});

test('It converts underscores to camelCase', function(assert) {
  this.render(hbs`{{camelize "harry_potter"}}`);

  let expected = 'harryPotter';

  assert.equal(this.$().text().trim(), expected, 'converts underscores to camelCase');
});

test('It converts dashes to camelCase', function(assert) {
  this.render(hbs`{{camelize "harry-potter"}}`);

  let expected = 'harryPotter';

  assert.equal(this.$().text().trim(), expected, 'converts dashes to camelCase');
});

test('It converts spaces to camelCase', function(assert) {
  this.render(hbs`{{camelize "age is foolish and forgetful when it underestimates youth"}}`);

  let expected = 'ageIsFoolishAndForgetfulWhenItUnderestimatesYouth';

  assert.equal(this.$().text().trim(), expected, 'correctly camelizes input with spaces');
});

test('It correctly handles empty string input', function(assert) {
  this.render(hbs`{{camelize ""}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if input is empty string');
});

test('It correctly handles undefined input', function(assert) {
  this.render(hbs`{{camelize undefined}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if undefined input');
});
