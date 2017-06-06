import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('repeat', 'Integration | Helper | {{repeat}}', {
  integration: true
});

test('it repeats `n` times', function(assert) {
  this.render(hbs`
    {{~#each (repeat 3) as |empty|~}}
      1
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), '111', 'should repeat 3 times');
});

test('it repeats `n` times with a value', function(assert) {
  this.set('person', { name: 'Adam' });
  this.render(hbs`
    {{~#each (repeat 3 person) as |person|~}}
      {{~person.name~}}
    {{~/each~}}
  `);

  assert.equal(find('*').textContent.trim(), 'AdamAdamAdam', 'should repeat 3 times with a value');
});
