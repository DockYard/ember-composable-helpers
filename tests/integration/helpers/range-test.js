import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{range}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates a range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 5) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.dom().hasText('1234', 'should generate a range');
  });

  test('it generates a negative range', async function(assert) {
    await render(hbs`
      {{~#each (range 5 1) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.dom().hasText('5432', 'should generate a negative range');
  });

  test('it generates an inclusive range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 5 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.dom().hasText('12345', 'should generate an inclusive range');
  });

  test('it generates a negative inclusive range', async function(assert) {
    await render(hbs`
      {{~#each (range 5 1 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.dom().hasText('54321', 'should generate a negative inclusive range');
  });

  test('it generates an inclusive range with equal arguments', async function(assert) {
    await render(hbs`
      {{~#each (range 1 1 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.dom().hasText('1', 'should generate an inclusive range');
  });

  test('it generates an empty range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 1) as |number|~}}
        {{~number~}}
      {{~else~}}
        empty
      {{~/each~}}
    `);

    assert.dom().hasText('empty', 'should generate an empty range');
  });
});

