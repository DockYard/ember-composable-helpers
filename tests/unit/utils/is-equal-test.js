import EmberObject from '@ember/object';
import isEqual from 'ember-composable-helpers/utils/is-equal';
import { module, test } from 'qunit';

module('Unit | Utility | is equal', function() {
  let testData = [
    {
      label: 'POJOs',
      firstValue: { foo: 'bar' },
      secondValue: { foo: 'bar' },
      useDeepEqual: true,
      expected: true
    },
    {
      label: 'POJOs',
      firstValue: { foo: 'bar' },
      secondValue: { bar: 'foo' },
      useDeepEqual: true,
      expected: false
    },
    {
      label: 'EmberObjects',
      firstValue: EmberObject.create({ foo: 'bar' }),
      secondValue: EmberObject.create({ foo: 'bar' }),
      useDeepEqual: true,
      expected: true
    },
    {
      label: 'EmberObjects',
      firstValue: EmberObject.create({ foo: 'bar' }),
      secondValue: EmberObject.create({ bar: 'foo' }),
      useDeepEqual: true,
      expected: false
    },
    {
      label: 'Primitives',
      firstValue: 'a',
      secondValue: 'a',
      useDeepEqual: false,
      expected: true
    },
    {
      label: 'Ember.isEqual applied to firstValue',
      firstValue: EmberObject.extend({
        isEqual(value) {
          return this.get('value') === value;
        }
      }).create({ 'value': 10 }),
      secondValue: 10,
      useDeepEqual: false,
      expected: true
    },
    {
      label: 'Ember.isEqual applied to secondValue',
      firstValue: 10,
      secondValue: EmberObject.extend({
        isEqual(value) {
          return this.get('value') === value;
        }
      }).create({ 'value': 10 }),
      useDeepEqual: false,
      expected: true
    }
  ];

  testData.forEach(({ label, firstValue, secondValue, useDeepEqual, expected }) => {
    test(`it works with ${label}`, function(assert) {
      let result = isEqual(firstValue, secondValue, useDeepEqual);
      assert.equal(result, expected, `should be ${expected}`);
    });
  });
});
