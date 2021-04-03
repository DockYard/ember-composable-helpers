import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';

module('Integration | Helper | {{dec}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it decrements a value', async function(assert) {
    await render(hbs`{{dec 3}}`);

    assert.equal(find('*').textContent.trim(), '2', 'should decrement by 1');
  });

  test('it decrements a value', async function(assert) {
    await render(hbs`{{dec 2 5}}`);

    assert.equal(find('*').textContent.trim(), '3', 'should decrement by 2');
  });

  test('it decrements below 0', async function(assert) {
    await render(hbs`{{dec 2 0}}`);

    assert.equal(find('*').textContent.trim(), '-2', 'should be -2');
  });

  test('It can decrement a string', async function(assert) {
    await render(hbs`{{dec "2"}}`);

    assert.equal(find('*').textContent.trim(), '1', 'should decrement by 1');
  });

  test('It handles when undefined is passed', async function(assert) {
    await render(hbs`{{dec}}`);

    assert.equal(find('*').textContent.trim(), '', 'should not return a value');
  });
});
