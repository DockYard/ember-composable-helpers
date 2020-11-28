import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{union}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It takes the union of the given arrays', async function(assert) {
    this.set('array1', ['foo', 'bar']);
    this.set('array2', ['foo', 'baz']);
    this.set('array3', ['qux', 'bar']);

    await render(hbs`
      {{~#each (union array1 array2 array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'foobarbazqux', 'union leaves no repeated words');
  });

  test('It watches for changes', async function(assert) {
    this.set('array1', emberArray(['foo', 'bar']));
    this.set('array2', emberArray(['foo', 'baz']));
    this.set('array3', emberArray(['qux', 'bar']));

    await render(hbs`
      {{~#each (union array1 array2 array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    run(() => this.get('array1').pushObject('leet'));

    assert.equal(find('*').textContent.trim(), 'foobarleetbazqux', 'leet is added');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (union array array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (union array array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
