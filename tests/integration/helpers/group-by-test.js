import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{group-by}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It groups by given property', async function(assert) {
    this.set('array', emberArray([
      { category: 'a', name: 'a' },
      { category: 'b', name: 'c' },
      { category: 'a', name: 'b' },
      { category: 'b', name: 'd' }
    ]));

    await render(hbs`
      {{~#each-in (group-by 'category' array) as |category entries|~}}
        {{~category~}}
        {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
      {{~/each-in~}}
    `);

    assert.equal(find('*').textContent.trim(), 'aabbcd', 'aabbcd is the right order');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([
      { category: 'a', name: 'a' },
      { category: 'b', name: 'c' },
      { category: 'a', name: 'b' },
      { category: 'b', name: 'd' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each-in (group-by 'category' array) as |category entries|~}}
        {{~category~}}
        {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
      {{~/each-in~}}
    `);

    run(() => set(array.objectAt(3), 'category', 'c'));

    assert.equal(find('*').textContent.trim(), 'aabbccd', 'aabbccd is the right order');
  });
});
