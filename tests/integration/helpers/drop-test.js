import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('drop', 'Integration | Helper | {{drop}}', {
  integration: true
});

test('It drops the first N entries of array', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4, 5]));

  this.render(hbs`
    {{~#each (drop 2 array) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '345', 'first two values are dropped');
});

test('It watches for changes', function(assert) {
  let array = emberArray([1, 2, 3, 4, 5]);
  this.set('array', array);

  this.render(hbs`
    {{~#each (drop 2 array) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  run(() => array.unshiftObject(0));

  assert.equal(find('*').textContent.trim(), '2345', '0 and 1 are dropped');
});
