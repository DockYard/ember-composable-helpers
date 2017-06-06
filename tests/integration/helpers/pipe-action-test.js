import { click } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pipe-action', 'Integration | Helper | {{pipe-action}}', {
  integration: true
});

test('it can be used as a closure action', async function(assert) {
  let value = 0;
  this.on('add', (x, y) => x + y);
  this.on('square', (x) => x * x);
  this.on('squareRoot', (x) => value = Math.sqrt(x));
  this.render(hbs`
    {{perform-calculation
        calculate=(pipe-action
          (action "add")
          (action "square")
          (action "squareRoot"))
    }}
  `);

  assert.equal(value, '0', 'precond - should render 0');
  await click('button');
  assert.equal(value, '6', 'should render 6');
});
