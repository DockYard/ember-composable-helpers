import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('html-safe', 'Integration | Helper | {{html-safe}}', {
  integration: true
});

test('It html-safes the html string', function(assert) {
  this.render(hbs`{{html-safe '<h1>Hello World</h1>'}}`);

  assert.equal(this.$('h1').text().trim(), 'Hello World', 'html string is correctly rendered');
});

test('It safely renders CSS classes from a property', function(assert) {
  this.set('classes', 'error has-error');
  this.render(hbs`<h1 class={{html-safe classes}}>Hello World</h1>`);

  assert.equal(this.$('h1').text().trim(), 'Hello World', 'it renders');
  assert.deepEqual(this.$('h1').attr('class').split(' ').sort(), ['error', 'has-error'].sort(), 'it has the correct CSS classes');
});
