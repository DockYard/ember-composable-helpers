import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{has-next}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it checks if an array has a next value', async function(assert) {
    let array = [
      { name: 'Ross' },
      { name: 'Rachel' },
      { name: 'Joey' }
    ];
    this.set('array', array);
    this.set('value', { name: 'Rachel' });
    this.set('useDeepEqual', true);

    await render(hbs`{{has-next value useDeepEqual array}}`);

    assert.equal(find('*').textContent.trim(), 'true', 'should render true');
  });

  test('It recomputes if array changes', async function(assert) {
    this.set('array', emberArray([1, 2, 3]));
    this.set('value', 1);

    await render(hbs`{{has-next value array}}`);

    assert.equal(find('*').textContent.trim(), 'true', 'true is shown');

    run(() => this.set('array', [3, 2, 1]));

    assert.equal(find('*').textContent.trim(), 'false', 'false is shown');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`{{has-next 1 array}}`);

    assert.equal(find('*').textContent.trim(), 'false', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`{{has-next 1 array}}`);

    assert.equal(find('*').textContent.trim(), 'false', 'no error is thrown');
  });
});
