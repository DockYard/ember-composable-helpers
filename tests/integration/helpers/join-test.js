import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('join', 'Integration | Helper | {{join}}', {
  integration: true
});

test('It joins the words with given separator', function(assert) {
  this.set('array', emberArray(['foo', 'bar', 'baz']));

  this.render(hbs`{{join ', ' array}}`);

  assert.equal(find('*').textContent.trim(), 'foo, bar, baz', 'words are joined with a comma and a space');
});

test('The default separator is a comma', function(assert) {
  this.set('array', emberArray(['foo', 'bar', 'baz']));

  this.render(hbs`{{join array}}`);

  assert.equal(find('*').textContent.trim(), 'foo,bar,baz', 'words are joined with a comma');
});

test('It watches for changes', function(assert) {
  let array = emberArray(['foo', 'bar', 'baz']);
  this.set('array', array);

  this.render(hbs`{{join ', ' array}}`);

  run(() => array.pushObject('quux'));

  assert.equal(find('*').textContent.trim(), 'foo, bar, baz, quux', 'quux was added');
});
