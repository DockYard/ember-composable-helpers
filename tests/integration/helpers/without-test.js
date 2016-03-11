import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('without', 'Integration | Helper | {{without}}', {
  integration: true
});

test('it returns a new array with given value ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);

  this.render(hbs`
    {{~#each (without "foo" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'barbaz', 'should render remaining values');
});

test('it returns a new array with given values ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);
  this.set('selectedItems', ['foo', 'bar']);

  this.render(hbs`
    {{~#each (without selectedItems items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'baz', 'should render remaining values');
});

test('it returns the same array when no values are ommitted', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);

  this.render(hbs`
    {{~#each (without "missing" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'foobarbaz', 'should render remaining values');
});
