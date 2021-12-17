import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{pipe-action}}', function(hooks) {
  setupRenderingTest(hooks);

  test('it can be used as a closure action', async function(assert) {
    let value = 0;

    this.add = (x, y) => x + y;
    this.square = (x) => x * x;
    this.squareRoot = (x) => value = Math.sqrt(x);

    await render(hbs`
      {{#let (pipe-action this.add this.square this.squareRoot) as |calculate|}}
        <button {{on "click" (fn calculate 2 4)}}>
          Calculate
        </button>
      {{/let}}
    `);

    assert.equal(value, '0', 'precond - should render 0');

    await click('button');

    assert.equal(value, '6', 'should render 6');
  });

  test('it resolves in the given context', async function(assert) {
    const Component = {
      calculateService: this.owner.lookup('service:calculate'),
      setValue(x) { this.set('value', x); },
      actions: {
        add(x, y) { return x + y; },
        square(x) { return x * x; },
        squareRoot(x) { return Math.sqrt(x); }
      }
    };

    Object.assign(this, Component);

    await render(hbs`
      {{perform-calculation
          calculate=(pipe-action
            (action "add")
            (action "square")
            (action "squareRoot")
            setValue
            target=calculateService
          )
      }}
    `);

    assert.equal(this.calculateService.get('value'), undefined, 'precond - should render 0');
    await click('button');
    assert.equal(this.calculateService.get('value'), '6', 'should render 6');
  });

  test('it handles mixed contexts', async function(assert) {
    const Component = {
      calculateService: this.owner.lookup('service:calculate'),
      setValue(x) { this.set('value', x); },
      actions: {
        square(x) { return x * x; },
        squareRoot(x) { return Math.sqrt(x); }
      }
    };

    Object.assign(this, Component);

    this.calculateService.actions = { add(x, y) { return x + y; } }

    await render(hbs`
      {{perform-calculation
          calculate=(pipe-action
            (action "add" target=calculateService)
            (action "square")
            (action "squareRoot")
            setValue
            target=calculateService
          )
      }}
    `);

    assert.equal(this.calculateService.get('value'), undefined, 'precond - should render 0');
    await click('button');
    assert.equal(this.calculateService.get('value'), '6', 'should render 6');
  });
});
