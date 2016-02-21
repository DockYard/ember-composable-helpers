import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('join', 'Integration | Helper | {{join}}', {
  integration: true
});

test('It splits the string on whitespace', function(assert) {
  this.set('string', 'foo bar\nbaz');

  this.render(hbs`{{#each (w string) as |word|}}{{word}}{{/each}}`);

  assert.equal(this.$().text().trim(), 'foobarbaz', 'the words are split');
});

test('It makes an array of many words', function(assert) {
  this.render(hbs`{{#each (w "foo" "bar" "baz") as |word|}}{{word}}{{/each}}`);
  assert.equal(this.$().text().trim(), 'foobarbaz', 'the words are turned into an array');
});

test('You can even break up multiple strings of words', function(assert) {
  this.render(hbs`{{#each (w "foo bar" "baz") as |word|}}{{word}}{{/each}}`);
  assert.equal(this.$().text().trim(), 'foobarbaz', 'the words are turned into an array');
});
