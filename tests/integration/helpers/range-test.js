import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{range}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates a range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 5) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '1234', 'should generate a range');
  });

  test('it generates a negative range', async function(assert) {
    await render(hbs`
      {{~#each (range 5 1) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '5432', 'should generate a negative range');
  });

  test('it generates an inclusive range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 5 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '12345', 'should generate an inclusive range');
  });

  test('it generates a negative inclusive range', async function(assert) {
    await render(hbs`
      {{~#each (range 5 1 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '54321', 'should generate a negative inclusive range');
  });

  test('it generates an inclusive range with equal arguments', async function(assert) {
    await render(hbs`
      {{~#each (range 1 1 true) as |number|~}}
        {{~number~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '1', 'should generate an inclusive range');
  });

  test('it generates an empty range', async function(assert) {
    await render(hbs`
      {{~#each (range 1 1) as |number|~}}
        {{~number~}}
      {{~else~}}
        empty
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'empty', 'should generate an empty range');
  });
});

