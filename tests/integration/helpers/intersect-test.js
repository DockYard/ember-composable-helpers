import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{intersect}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It takes the intersection of the given arrays', async function(assert) {
    this.set('array1', ['foo', 'bar']);
    this.set('array2', ['foo', 'baz']);
    this.set('array3', ['qux', 'foo']);

    await render(hbs`
      {{~#each (intersect this.array1 this.array2 this.array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    assert.dom().hasText('foo', 'intersect shows words common to all arrays');
  });

  test('It watches for changes', async function(assert) {
    this.set('array1', emberArray(['foo', 'bar']));
    this.set('array2', emberArray(['foo', 'baz']));
    this.set('array3', emberArray(['qux', 'foo']));

    await render(hbs`
      {{~#each (intersect this.array1 this.array2 this.array3) as |word|~}}
        {{~word~}}
      {{~/each~}}
    `);

    run(() => this.get('array2').pushObject('bar'));
    run(() => this.get('array3').pushObject('bar'));

    assert.dom().hasText('foobar', 'bar is added');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (intersect this.array this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (intersect this.array this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows a first parameter null array', async function(assert) {
    this.set('array1', null);
    this.set('array2', ['foo', 'baz']);

    await render(hbs`
      this is all that will render
      {{#each (intersect this.array1 this.array2) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
