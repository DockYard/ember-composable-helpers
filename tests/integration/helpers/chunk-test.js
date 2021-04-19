import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{chunk}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It chunks an empty array', async function(assert) {
    this.set('array', []);
    this.set('size', 2);

    await render(hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

    assert.dom().hasText('', 'nothing is displayed');
  });

  test('It chunks an array into 0 parts', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('size', 0);

    await render(hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

    assert.dom().hasText('', 'nothing is displayed');
  });

  test('It chunks an array into negative parts', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('size', -1);

    await render(hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{/each}}`);

    assert.dom().hasText('', 'nothing is displayed');
  });

  test('It chunks an array into parts of 1', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('size', 1);

    await render(hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}} {{/each}}`);

    assert.dom().hasText('1 2 3', 'chunked arrays are displayed');
  });

  test('It chunks an array into parts of current array length', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('size', 3);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}}{{chunkedArray.[2]}}{{/each}}`
    );

    assert.dom().hasText('123', 'chunked arrays are displayed');
  });

  test('It chunks an array into parts of more than the current array length', async function(assert) {
    this.set('array', [1, 2, 3]);
    this.set('size', 5);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}}{{chunkedArray.[2]}}{{/each}}`
    );

    assert.dom().hasText('123', 'chunked arrays are displayed');
  });

  test('It chunks an array into parts of less than current array length', async function(assert) {
    this.set('array', [10, 20, 30, 40, 50, 60, 70]);
    this.set('size', 2);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`
    );

    assert.dom().hasText('1020 3040 5060 70', 'chunked arrays are displayed');
  });

  test('It recomputes if the size changes', async function(assert) {
    this.set('array', [1, 2, 3, 4]);
    this.set('size', 1);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`
    );

    assert.dom().hasText('1 2 3 4', 'chunked arrays are displayed');

    this.set('size', 2);

    assert.dom().hasText('12 34', 'updated chunked arrays are displayed');
  });

  test('It recomputes if the array changes', async function(assert) {
    this.set('array', [1, 2, 3, 4]);
    this.set('size', 2);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`
    );

    assert.dom().hasText('12 34', 'chunked arrays are displayed');

    this.set('array', [5, 6, 7, 8]);

    assert.dom().hasText('56 78', 'updated chunked arrays are displayed');
  });

  test('It recomputes if an item in the array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3, 4]));
    this.set('size', 2);

    await render(
      hbs`{{#each (chunk this.size this.array) as |chunkedArray|}}{{chunkedArray.[0]}}{{chunkedArray.[1]}} {{/each}}`
    );

    assert.dom().hasText('12 34', 'chunked arrays are displayed');

    run(() => this.get('array').pushObjects(['some', 'new', 'items']));

    assert.dom().hasText('12 34 somenew items', 'updated chunked arrays are displayed');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (chunk 1 this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (chunk 1 this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
