import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('union', 'Integration | Helper | {{union}}', {
  integration: true
});

test('It takes the union of the given arrays', function(assert) {
  this.set('array1', ['foo', 'bar']);
  this.set('array2', ['foo', 'baz']);
  this.set('array3', ['qux', 'bar']);

  this.render(hbs`
    {{~#each (union array1 array2 array3) as |word|~}}
      {{~word~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'foobarbazqux', 'union leaves no repeated words');
});

test('It watches for changes', function(assert) {
  this.set('array1', emberArray(['foo', 'bar']));
  this.set('array2', emberArray(['foo', 'baz']));
  this.set('array3', emberArray(['qux', 'bar']));

  this.render(hbs`
    {{~#each (union array1 array2 array3) as |word|~}}
      {{~word~}}
    {{~/each~}}
  `);

  run(() => this.get('array1').pushObject('leet'));

  assert.equal(find('*').textContent.trim(), 'foobarleetbazqux', 'leet is added');
});
