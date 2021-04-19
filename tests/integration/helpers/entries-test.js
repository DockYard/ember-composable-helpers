import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | entries', function(hooks) {
  setupRenderingTest(hooks);

  test('it return object entries', async function(assert) {
    let object = {
      a: 1,
      b: 2
    }

    this.set('object', object);

    await render(hbs`
    {{#each (entries this.object) as |entry|}}{{get entry 0}}{{get entry 1}}{{/each}}`);
    assert.dom(this.element).hasText('a1b2');
  });

  test('it works with sort-by', async function(assert) {
    let object = {
      b: 2,
      a: 1,
      d: 4,
      c: 3
    }

    this.set('object', object);
    this.set('myOwnSortBy', function(a, b) {
      if (a[1] > b[1]) {
        return 1;
      } else if (a[1] < b[1]) {
        return -1;
      }
      return 0;
    });
    await render(hbs`
    {{#each (sort-by this.myOwnSortBy (entries this.object)) as |entry|}}{{get entry 0}}{{/each}}`);
    assert.dom(this.element).hasText('abcd');
  });

  test('it handles undefined input', async function(assert) {
    await render(hbs`
      {{#each (entries undefined) as |key|}}{{key}}{{/each}}
    `);

    assert.dom(this.element).hasText('');
  });

  test('it handles null input', async function(assert) {
    await render(hbs`
      {{#each (entries null) as |key|}}{{key}}{{/each}}
    `);

    assert.dom(this.element).hasText('');
  });
});
