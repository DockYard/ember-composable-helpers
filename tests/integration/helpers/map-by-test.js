import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{map-by}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It maps by value', async function(assert) {
    this.set('array', emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]));

    await render(hbs`
      {{~#each (map-by 'name' array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'abc', 'name property is mapped');
  });

  test('It watches for changes', async function(assert) {
    let array = emberArray([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (map-by 'name' array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    run(() => array.pushObject({ name: 'd' }));

    assert.equal(find('*').textContent.trim(), 'abcd', 'd is added');
  });

  test('It watches for changes to byPath', async function(assert) {
    let array = emberArray([
      { name: 'a', x: 1 },
      { name: 'b', x: 2 },
      { name: 'c', x: 3 }
    ]);

    this.set('array', array);
    this.set('property', 'name');

    await render(hbs`
      {{~#each (map-by property array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    this.set('property', 'x');

    assert.equal(find('*').textContent.trim(), '123', '123 is displayed');
  });

  test('It allows null arrays', async function(assert) {
    this.set('array', null);

    await render(hbs`
      {{~#each (map-by 'name' array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '', 'this is all that will render, but there is no error');
  });
});
