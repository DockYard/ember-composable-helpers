import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('capitalize', 'Integration | Helper | {{capitalize}}', {
  integration: true
});

test('It capitalizes a single string', function(assert) {
  this.render(hbs`{{capitalize "hi"}}`);

  let expected = 'Hi';

  assert.equal(this.$().text().trim(), expected, 'capitalizes a single string');
});

test('It leaves the capitalization unchanged with correctly capitalized string', function(assert) {
  this.render(hbs`{{capitalize "Harry"}}`);

  let expected = 'Harry';

  assert.equal(this.$().text().trim(), expected, 'leaves capitalization when string is already capitalized');
});

test('It correctly capitalizes an uncapitalized sentence', function(assert) {
  this.render(hbs`{{capitalize "age is foolish and forgetful when it underestimates youth"}}`);

  let expected = 'Age is foolish and forgetful when it underestimates youth';

  assert.equal(this.$().text().trim(), expected, 'correctly capitalizes an uncapitalized sentence');
});

test('It correctly handles empty string input', function(assert) {
  this.render(hbs`{{capitalize ""}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if input is empty string');
});

test('It correctly handles undefined input', function(assert) {
  this.render(hbs`{{capitalize undefined}}`);

  let expected = '';

  assert.equal(this.$().text().trim(), expected, 'renders empty string if undefined input');
});
