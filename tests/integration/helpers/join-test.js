import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{join}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It joins the words with given separator', async function(assert) {
    this.set('array', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`{{join ', ' array}}`);

    assert.equal(find('*').textContent.trim(), 'foo, bar, baz', 'words are joined with a comma and a space');
  });

  test('The default separator is a comma', async function(assert) {
    this.set('array', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`{{join array}}`);

    assert.equal(find('*').textContent.trim(), 'foo,bar,baz', 'words are joined with a comma');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray(['foo', 'bar', 'baz']);
    this.set('array', array);

    await render(hbs`{{join ', ' array}}`);

    run(() => array.pushObject('quux'));

    assert.equal(find('*').textContent.trim(), 'foo, bar, baz, quux', 'quux was added');
  });
});
