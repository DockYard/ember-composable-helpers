import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{repeat}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it repeats `n` times', async function(assert) {
    await render(hbs`
      {{~#each (repeat 3) as |empty|~}}
        1
      {{~/each~}}
    `);

    assert.dom().hasText('111', 'should repeat 3 times');
  });

  test('it repeats `n` times with a value', async function(assert) {
    this.set('person', { name: 'Adam' });
    await render(hbs`
      {{~#each (repeat 3 this.person) as |person|~}}
        {{~person.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('AdamAdamAdam', 'should repeat 3 times with a value');
  });
});
