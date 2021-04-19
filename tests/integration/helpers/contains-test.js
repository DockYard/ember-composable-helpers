import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{contains}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it checks if an array contains a primitive value', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`{{contains 'foo' this.items}}`);

    assert.dom().hasText('true', 'should render true');
  });

  test('it checks if an array contains a non-primitive value', async function(assert) {
    let games = [
      { name: 'Firewatch' },
      { name: 'Rocket League' },
      { name: 'CSGO' }
    ];
    this.set('selectedGame', games[0]);
    this.set('wishlist', games);

    await render(hbs`{{contains this.selectedGame this.wishlist}}`);

    assert.dom().hasText('true', 'should render true');
  });

  test('it checks if an array contains an array of primitive values', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz', undefined, null]);
    this.set('selectedItems', ['foo', 'bar', undefined, null]);

    await render(hbs`{{contains this.selectedItems this.items}}`);

    assert.dom().hasText('true', 'should render true');
  });

  test('it watches for changes', async function(assert) {
    let games = [
      { name: 'Firewatch' },
      { name: 'Rocket League' },
      { name: 'CSGO' }
    ];
    this.set('selectedGame', games[0]);
    this.set('wishlist', games);

    await render(hbs`{{contains this.selectedGame this.wishlist}}`);

    assert.dom().hasText('true', 'should render true');

    run(() => this.get('wishlist').removeObject(games[0]));

    assert.dom().hasText('false', 'should render false');

    run(() => this.set('selectedGame', games[1]));

    assert.dom().hasText('true', 'should render true');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{~#each (contains 1 this.array) as |val|~}}
        {{val}}
      {{~/each~}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{~#each (contains 1 this.array) as |val|~}}
        {{val}}
      {{~/each~}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
