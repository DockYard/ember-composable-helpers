import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pipe', 'Integration | Helper | {{pipe}}', {
  integration: true
});

test('it pipes actions', function(assert) {
  this.set('value', 0);
  this.on('add', (x, y) => x + y);
  this.on('square', (x) => x * x);
  this.on('squareRoot', (x) => this.set('value', Math.sqrt(x)));
  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe (action "add") (action "square") (action "squareRoot")) 2 4}}>
      Calculate
    </button>
  `);

  assert.equal(this.$('p').text().trim(), '0', 'precond - should render 0');
  this.$('button').click();
  assert.equal(this.$('p').text().trim(), '6', 'should render 6');
});
