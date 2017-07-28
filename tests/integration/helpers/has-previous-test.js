import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('previous', 'Integration | Helper | {{has-previous}}', {
  integration: true
});

test('it checks if an array has a previous value', function(assert) {
  let array = [
    { name: 'Ross' },
    { name: 'Rachel' },
    { name: 'Joey' }
  ];
  this.set('array', array);
  this.set('value', { name: 'Rachel' });
  this.set('useDeepEqual', true);

  this.render(hbs`{{has-previous value useDeepEqual array}}`);

  assert.equal(find('*').textContent.trim(), 'true', 'should render true');
});

test('It recomputes if array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3]));
  this.set('value', 1);

  this.render(hbs`{{has-previous value array}}`);

  assert.equal(find('*').textContent.trim(), 'false', 'true is shown');

  run(() => this.set('array', [3, 2, 1]));

  assert.equal(find('*').textContent.trim(), 'true', 'false is shown');
});
