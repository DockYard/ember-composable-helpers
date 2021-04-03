import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Helper | {{inc}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it increments a value', async function(assert) {
    await render(hbs`{{inc 1}}`);

    assert.equal(find('*').textContent.trim(), '2', 'should increment by 1');
  });

  test('it increments a value', async function(assert) {
    await render(hbs`{{inc 2 1}}`);

    assert.equal(find('*').textContent.trim(), '3', 'should increment by 2');
  });

  test('It can increment a string', async function(assert) {
    await render(hbs`{{inc "1"}}`);

    assert.equal(find('*').textContent.trim(), '2', 'should increment by 1');
  });

  test('It handles when undefined is passed', async function(assert) {
    await render(hbs`{{inc}}`);

    assert.equal(find('*').textContent.trim(), '', 'should not return a value');
  });
});
