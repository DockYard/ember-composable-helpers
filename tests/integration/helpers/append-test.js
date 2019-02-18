import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{append}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It concats two arrays', async function(assert) {
    this.set('evens', emberArray([2, 4, 6]));
    this.set('odds', emberArray([1, 3, 5]));

    await render(hbs`
      {{~#each (append evens odds) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    let expected = '246135';

    assert.equal(find('*').textContent.trim(), expected, 'appends values');
  });

  test('It concats two arrays and a value', async function(assert) {
    this.set('evens', emberArray([4, 6]));
    this.set('odds', emberArray([1, 3, 5]));
    this.set('prime', 2);

    await render(hbs`
      {{~#each (append evens odds prime) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    let expected = '461352';

    assert.equal(find('*').textContent.trim(), expected, 'appends values');
  });

  test('It watches for changes', async function(assert) {
    this.set('odds', emberArray([1, 3, 5]));
    this.set('prime', 2);

    await render(hbs`
      {{~#each (append odds prime) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    run(() => this.get('odds').pushObject(7));
    assert.equal(find('*').textContent.trim(), '13572', 'new value is added');
  });
});
