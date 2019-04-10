import EmberObject from '@ember/object';
import getIndex from 'ember-composable-helpers/utils/get-index';
import { module, test } from 'qunit';

module('Unit | Utility | get index', function() {
  let testData = [
    {
      label: 'POJOs',
      array: [{ foo: 'baz' }, { bar: 'foo' }, { baz: 'bar' }],
      item: { foo: 'baz' },
      expected: 0,
      useDeepEqual: true
    },
    {
      label: 'EmberObjects',
      array: [
        EmberObject.create({ bar: 'foo' }),
        EmberObject.create({ foo: 'baz' }),
        EmberObject.create({ baz: 'bar' })
      ],
      item: { foo: 'baz' },
      expected: 1,
      useDeepEqual: true
    },
    {
      label: 'Strings',
      array: ['a', 'b', 'c'],
      item: 'c',
      expected: 2,
      useDeepEqual: false
    }
  ];

  testData.forEach(({ label, array, item, expected, useDeepEqual }) => {
    test(`it works with ${label}`, function(assert) {
      let result = getIndex(array, item, useDeepEqual);
      assert.equal(result, expected, `should be ${expected}`);
    });
  });

  test('it returns null if the given value is not in the array', function(assert) {
    let result = getIndex([1, 2, 3], 4);
    assert.equal(result, null, 'should be null');
  });
});
