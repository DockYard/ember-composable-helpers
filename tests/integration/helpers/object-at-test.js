import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{object-at}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It gets an object by index', async function(assert) {
    this.set('array', ['apples', 'oranges', 'bananas']);
    this.set('index', 1);

    await render(hbs`{{object-at index array}}`);

    assert.equal(find('*').textContent.trim(), 'oranges', 'the correct object is displayed');
  });

  test('It returns undefined with the index is outside the bounds of the array', async function(assert) {
    this.set('array', ['apples', 'oranges', 'bananas']);
    this.set('index', 5);

    await render(hbs`{{if (object-at index array) 'true' 'false'}}`);

    assert.equal(find('*').textContent.trim(), 'false', 'the returned value is falsey');
  });

  test('It returns an updated value when the object at the given index changes', async function(assert) {
    this.set('array', emberArray(['apples', 'oranges', 'bananas']));
    this.set('index', 1);

    await render(hbs`{{object-at index array}}`);

    assert.equal(find('*').textContent.trim(), 'oranges', 'the original object is display');

    run(() => this.get('array').removeAt(1, 1));

    assert.equal(find('*').textContent.trim(), 'bananas', 'the new object is displayed');
  });

  test('It returns undefined if using an non-array-like object', async function(assert) {
    this.set('array', 'foo');
    this.set('index', 1);

    await render(hbs`{{object-at index array}}`);

    assert.equal(find('*').textContent.trim(), '', 'nothing is displayed');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{object-at 1 array}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{object-at 1 array}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
