import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { A: emberArray, run } = Ember;

moduleForComponent('shuffle', 'Integration | Helper | {{shuffle}}', {
  integration: true
});

test('It shuffles array', function(assert) {
  this.set('array', emberArray([1, 2]));
  this.render(hbs`
    {{~#each (shuffle array) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  let shuffled = this.$().text().trim();
  assert.ok(shuffled === '12' || shuffled === '21', 'array is shuffled');
});

test('It shuffles array using passed in randomizer', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4]));
  this.on('fake', () => 0);
  this.render(hbs`
    {{~#each (shuffle array (action "fake")) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '2341', 'array is shuffled');
});

test('It handles a non-ember array', function(assert) {
  this.set('array', [1, 2, 3, 4]);
  this.on('fake', () => 0);
  this.render(hbs`
    {{~#each (shuffle array (action "fake")) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '2341', 'array is shuffled');
});

test('It does not mutate the original array', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4]));
  this.on('fake', () => 0);
  this.render(hbs`
    {{~#each (shuffle array (action "fake")) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '2341', 'array is shuffled');
  assert.deepEqual(this.get('array'), [1, 2, 3, 4], 'the original array is not shuffled');
});

test('It gracefully handles non-array values', function(assert) {
  this.set('notArray', 1);
  this.render(hbs`
    {{~#each (shuffle notArray) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '1', 'the non array value is rendered');
});

test('It recomputes the shuffle if the array changes', function(assert) {
  this.set('array', emberArray([1, 2, 3, 4]));
  this.on('fake', () => 0);
  this.render(hbs`
    {{~#each (shuffle array (action "fake")) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '2341', 'array is shuffled');

  this.set('array', emberArray(['a', 2, 3, 4]));

  assert.equal(this.$().text().trim(), '234a', 'array is shuffled');
});

test('It recomputes the shuffle if an item in the array changes', function(assert) {
  let array = emberArray([1, 2, 3, 4]);
  this.set('array', array);
  this.on('fake', () => 0);
  this.render(hbs`
    {{~#each (shuffle array (action "fake")) as |value|~}}
      {{value}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), '2341', 'array is shuffled');

  run(() => array.replace(2, 1, [5]));

  assert.equal(this.$().text().trim(), '2541', 'array is shuffled');
});
