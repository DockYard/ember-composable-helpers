import ArrayProxy from '@ember/array/proxy';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{without}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it returns a new array with given value ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "foo" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
  });

  test('it returns a new array with given values ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);
    this.set('selectedItems', ['foo', 'bar']);

    await render(hbs`
      {{~#each (without selectedItems items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'baz', 'should render remaining values');
  });

  test('it returns the same array when no values are ommitted', async function(assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "missing" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render remaining values');
  });

  test('it responds to changes', async function(assert) {
    this.set('items', emberArray(['foo', 'bar', 'baz']));

    await render(hbs`
      {{~#each (without "quux" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should render all values');

    run(() => this.get('items').pushObject('quux'));
    assert.equal(find('*').textContent.trim(), 'foobarbaz', 'should not render quux');
  });

  test('it accepts array-like arrays', async function(assert) {
    this.set('items', ArrayProxy.create({ content: emberArray(['foo', 'bar', 'baz']) }));

    await render(hbs`
      {{~#each (without "foo" items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'barbaz', 'should render remaining values');
  });
});
