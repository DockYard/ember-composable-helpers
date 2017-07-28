import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('take', 'Integration | Helper | {{take}}', {
  integration: true
});

test('It takes the first N entries of array', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4, 5]));

  this.render(hbs`
    {{~#each (take 2 array) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '12', 'first two values are kept');
});

test('It watches for changes', function(assert) {
  let array = emberArray([1, 2, 3, 4, 5]);
  this.set('array', array);

  this.render(hbs`
    {{~#each (take 2 array) as |n|~}}
      {{n}}
    {{~/each~}}
  `);

  run(() => array.unshiftObject(0));

  assert.equal(find('*').textContent.trim(), '01', '0 and 1 are kept');
});
