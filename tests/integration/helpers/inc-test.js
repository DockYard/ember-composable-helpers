import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{inc}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it increments a value', async function(assert) {
    await render(hbs`{{inc 1}}`);

    assert.dom().hasText('2', 'should increment by 1');
  });

  test('it increments a value', async function(assert) {
    await render(hbs`{{inc 2 1}}`);

    assert.dom().hasText('3', 'should increment by 2');
  });

  test('It can increment a string', async function(assert) {
    await render(hbs`{{inc "1"}}`);

    assert.dom().hasText('2', 'should increment by 1');
  });

  test('It handles when undefined is passed', async function(assert) {
    await render(hbs`{{inc}}`);

    assert.dom().hasText('', 'should not return a value');
  });
});
