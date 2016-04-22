import Ember from 'ember';
import isEqual from 'ember-composable-helpers/utils/is-equal';
import { module, test } from 'qunit';

const { Object: EmberObject } = Ember;

module('Unit | Utility | is equal');

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
  }
];

testData.forEach(({ label, firstValue, secondValue, useDeepEqual, expected }) => {
  test(`it works with ${label}`, function(assert) {
    let result = isEqual(firstValue, secondValue, useDeepEqual);
    assert.equal(result, expected, `should be ${expected}`);
  });
});
