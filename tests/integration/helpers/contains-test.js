import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contains', 'Integration | Helper | {{contains}}', {
  integration: true
});

test('it checks if an array contains a primitive value', function(assert) {
  this.set('items', ['foo', 'bar', 'baz']);

  this.render(hbs`{{contains 'foo' items}}`);

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');
});

test('it checks if an array contains a non-primitive value', function(assert) {
  let games = [
    { name: 'Firewatch' },
    { name: 'Rocket League' },
    { name: 'CSGO' }
  ];
  this.set('selectedGame', games[0]);
  this.set('wishlist', games);

  this.render(hbs`{{contains selectedGame wishlist}}`);

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');
});

test('it checks if an array contains an array of primitive values', function(assert) {
  this.set('items', ['foo', 'bar', 'baz', undefined, null]);
  this.set('selectedItems', ['foo', 'bar', undefined, null]);

  this.render(hbs`{{contains selectedItems items}}`);

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');
});

test('it watches for changes', function(assert) {
  let games = [
    { name: 'Firewatch' },
    { name: 'Rocket League' },
    { name: 'CSGO' }
  ];
  this.set('selectedGame', games[0]);
  this.set('wishlist', games);

  this.render(hbs`{{contains selectedGame wishlist}}`);

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');

  run(() => this.get('wishlist').removeObject(games[0]));

  assert.equal(find('*').textContent.trim(), 'false', 'should render false');

  run(() => this.set('selectedGame', games[1]));

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');
});
