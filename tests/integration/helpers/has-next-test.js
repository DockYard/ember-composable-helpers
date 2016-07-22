import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('next', 'Integration | Helper | {{has-next}}', {
  integration: true
});

test('it checks if an array has a next value', function(assert) {
  let array = [
    { name: 'Ross' },
    { name: 'Rachel' },
    { name: 'Joey' }
  ];
  this.set('array', array);
  this.set('value', { name: 'Rachel' });
  this.set('useDeepEqual', true);

  this.render(hbs`{{has-next value useDeepEqual array}}`);

  assert.equal(this.$().text().trim(), 'true', 'should render true');
});

test('It recomputes if array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));
  this.set('value', 1);

  this.render(hbs`{{has-next value array}}`);

  assert.equal(this.$().text().trim(), 'true', 'true is shown');

  run(() => this.set('array', [3, 2, 1]));

  assert.equal(this.$().text().trim(), 'false', 'false is shown');
});
