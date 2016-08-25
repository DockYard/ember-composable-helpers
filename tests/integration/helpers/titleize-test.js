import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('titleize', 'Integration | Helper | {{titleize}}', {
  integration: true
});

test('It titleizes a string', function(assert) {
  this.render(hbs`
    {{titleize 'my big fat greek wedding'}}
  `);

  let expected = 'My Big Fat Greek Wedding';

  assert.equal(this.$().text().trim(), expected, 'titleized value');
});

test('It handles undefined', function(assert) {
  this.render(hbs`
    {{titleize nostring}}
  `);

  assert.equal(this.$().text().trim(), '', 'No value');
});

test('It handles null', function(assert) {
  this.set('value', null);
  this.render(hbs`{{titleize value}}`);

  assert.equal(this.$().text().trim(), '', 'No value');
});
