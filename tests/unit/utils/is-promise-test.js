import Ember from 'ember';
import isPromise from 'ember-composable-helpers/utils/is-promise';
import { module, test } from 'qunit';

const {
  RSVP: { Promise, resolve },
  K
} = Ember;

module('Unit | Utility | is promise');

let testData = [
  {
    value: resolve('foo'),
    expected: true
  },
  {
    value: new Promise((resolve) => resolve('blah')),
    expected: true
  },
  {
    value: { then: K, catch: K, finally: K },
    expected: true
  },
  {
    value: { then: K },
    expected: false
  },
  {
    value: 'blah',
    expected: false
  },
  {
    value: 42,
    expected: false
  },
  {
    value: ['meow'],
    expected: false
  },
  {
    value: null,
    expected: false
  }
];

testData.forEach(({ value, expected }) => {
  test('it checks if an object is an instance of an RSVP.Promise', function(assert) {
    let result = isPromise(value);

    assert.equal(result, expected, `should be ${expected}`);
  });
});
