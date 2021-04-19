import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{join}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It joins the words with given separator', async function(assert) {
    this.set('array', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`{{join ', ' this.array}}`);

    assert.dom().hasText('foo, bar, baz', 'words are joined with a comma and a space');
  });

  test('The default separator is a comma', async function(assert) {
    this.set('array', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`{{join this.array}}`);

    assert.dom().hasText('foo,bar,baz', 'words are joined with a comma');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray(['foo', 'bar', 'baz']);
    this.set('array', array);

    await render(hbs`{{join ', ' this.array}}`);

    run(() => array.pushObject('quux'));

    assert.dom().hasText('foo, bar, baz, quux', 'quux was added');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{join ', ' this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{join ', ' this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
