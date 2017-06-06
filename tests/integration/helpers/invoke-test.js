import { click, find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { RSVP: { resolve } } = Ember;

moduleForComponent('invoke', 'Integration | Helper | {{invoke}}', {
  integration: true
});

test('it invokes methods and handles promises', async function(assert) {
  this.set('value', 2);
  this.set('serverSideComputation', function(x) {
    return resolve(x * x);
  });
  this.on('setValue', (x) => this.set('value', x));

  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe (invoke "serverSideComputation" 2 this) (action "setValue"))}}>
      Calculate
    </button>
  `);

  assert.equal(find('p').textContent.trim(), '2', 'precond - should render 2');
  await click('button');
  assert.equal(find('p').textContent.trim(), '4', 'should render 4');
});

test('it invokes methods and handles promise arrays', async function(assert) {
  class Square {
    constructor(side) {
      this.side = side;
    }
    calcArea() {
      return resolve(this.side * this.side);
    }
  }

  this.set('model', [new Square(1), new Square(2), new Square(3)]);
  this.on('sumAreas', (x) => {
    this.set('value', x.reduce((a, b) => a + b));
  });

  this.render(hbs`
    <p>{{value}}</p>
    <button {{action (pipe (invoke "calcArea" this.model) (action "sumAreas"))}}>
      Calculate
    </button>
  `);

  await click('button');
  assert.equal(find('p').textContent.trim(), '14', 'should render 14');
});
