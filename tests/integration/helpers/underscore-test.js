import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('underscore', 'Integration | Helper | {{underscore}}', {
  integration: true
});

test('It converts camelCase correctly', function(assert) {
  this.render(hbs`{{underscore "andAnother"}}`);

  let expected = 'and_another';

  assert.equal(this.$().text().trim(), expected, 'converts camelCase to underscored');
});

test('It converts dashes to underscores', function(assert) {
  this.render(hbs`{{underscore "harry-potter"}}`);

  let expected = 'harry_potter';

  assert.equal(this.$().text().trim(), expected, 'converts dashes to underscores');
});

test('It converts spaces to underscores', function(assert) {
  this.render(hbs`{{underscore "age is foolish and forgetful when it underestimates youth"}}`);

  let expected = 'age_is_foolish_and_forgetful_when_it_underestimates_youth';

  assert.equal(this.$().text().trim(), expected, 'converts spaces to underscores');
});

test('It correctly handles empty string input', function(assert) {
  this.render(hbs`{{underscore ""}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if input is empty string');
});

test('It correctly handles undefined input', function(assert) {
  this.render(hbs`{{underscore undefined}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if undefined input');
});
