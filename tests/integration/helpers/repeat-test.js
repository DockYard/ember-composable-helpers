import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{repeat}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it repeats `n` times', async function(assert) {
    await render(hbs`
      {{~#each (repeat 3) as |empty|~}}
        1
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), '111', 'should repeat 3 times');
  });

  test('it repeats `n` times with a value', async function(assert) {
    this.set('person', { name: 'Adam' });
    await render(hbs`
      {{~#each (repeat 3 person) as |person|~}}
        {{~person.name~}}
      {{~/each~}}
    `);

    assert.equal(find('*').textContent.trim(), 'AdamAdamAdam', 'should repeat 3 times with a value');
  });
});
