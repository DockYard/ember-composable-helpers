import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { ArrayProxy, A: emberArray, run } = Ember;

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

test('it responds to changes', function(assert) {
  this.set('items', emberArray(['foo', 'bar', 'baz']));

  this.render(hbs`
    {{~#each (without "quux" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'foobarbaz', 'should render all values');

  run(() => this.get('items').pushObject('quux'));
  assert.equal(this.$().text().trim(), 'foobarbaz', 'should not render quux');
});

test('it accepts array-like arrays', function(assert) {
  this.set('items', ArrayProxy.create({ content: emberArray(['foo', 'bar', 'baz']) }));

  this.render(hbs`
    {{~#each (without "foo" items) as |remaining|~}}
      {{remaining}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'barbaz', 'should render remaining values');
});
