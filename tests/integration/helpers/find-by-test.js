import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{find-by}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It finds a value by a property', async function(assert) {
    this.set('array', emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]));

    await render(hbs`
      {{~#with (find-by 'name' 'b' this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('b', 'b is shown');
  });

  test('It finds a value by a property in arrays without prototype extensions', async function(assert) {
    this.set('array', [
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    await render(hbs`
      {{~#with (find-by 'name' 'b' this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('b', 'b is shown');
  });

  test('It recomputes the filter if array changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#with (find-by 'name' 'd' this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('', 'd is not found');

    run(() => array.pushObject({ foo: true, name: 'd' }));

    assert.dom().hasText('d', 'd is added and shown');
  });

  test('It recomputes the filter if a value under given path changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#with (find-by 'name' 'd' this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('', 'd is not found');

    run(() => set(array.objectAt(1), 'name', 'd'));

    assert.dom().hasText('d', 'd is shown');
  });

  test('It recomputes the value changes', async function(assert) {
    let array = emberArray([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' }
    ]);

    this.set('array', array);
    this.set('value', 'd');

    await render(hbs`
      {{~#with (find-by 'name' this.value this.array) as |item|~}}
        {{~item.name~}}
      {{~/with~}}
    `);

    assert.dom().hasText('', 'd is not found');

    run(() => set(this, 'value', 'b'));

    assert.dom().hasText('b', 'b is shown');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#with (find-by 'name' 'd' this.array) as |value|}}
        {{value}}
      {{/with}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function(assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#with (find-by 'name' 'd' this.array) as |value|}}
        {{value}}
      {{/with}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows freezed array', async function(assert) {
    this.set('array', Object.freeze([{name:'a'},{name:'b'}]));

    await render(hbs`
      {{#with (find-by 'name' 'a' this.array) as |value|}}
        {{value.name}}
      {{/with}}
    `);

    assert.dom().hasText('a', 'no error is thrown');
  });
});
