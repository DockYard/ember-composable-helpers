import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dasherize', 'Integration | Helper | {{dasherize}}', {
  integration: true
});

test('It converts camelCase correctly', function(assert) {
  this.render(hbs`{{dasherize "andAnother"}}`);

  let expected = 'and-another';

  assert.equal(this.$().text().trim(), expected, 'converts camelCase to dasherized');
});

test('It converts underscores to dashes', function(assert) {
  this.render(hbs`{{dasherize "harry_potter"}}`);

  let expected = 'harry-potter';

  assert.equal(this.$().text().trim(), expected, 'converts underscores to dashes');
});

test('It converts spaces to dashes', function(assert) {
  this.render(hbs`{{dasherize "age is foolish and forgetful when it underestimates youth"}}`);

  let expected = 'age-is-foolish-and-forgetful-when-it-underestimates-youth';

  assert.equal(this.$().text().trim(), expected, 'correctly dasherizes input with spaces');
});

test('It correctly handles empty string input', function(assert) {
  this.render(hbs`{{dasherize ""}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if input is empty string');
});

test('It correctly handles undefined input', function(assert) {
  this.render(hbs`{{dasherize undefined}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if undefined input');
});
