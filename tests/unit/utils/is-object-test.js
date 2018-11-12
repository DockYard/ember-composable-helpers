import EmberObject from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import isObject from 'ember-composable-helpers/utils/is-object';
import { module, test } from 'qunit';

module('Unit | Utility | is object', function() {
  let testData = [
    {
      label: 'POJOs',
      value: { foo: 'bar' },
      expected: true
    },
    {
      label: 'EmberObjects',
      value: EmberObject.create({ foo: 'bar' }),
      expected: true
    },
    {
      label: 'ObjectProxies',
      value: ObjectProxy.create({
        content: EmberObject.create({ foo: 'bar' })
      }),
      expected: true
    }
  ];

  testData.forEach(({ label, value, expected }) => {
    test(`it works with ${label}`, function(assert) {
      let result = isObject(value);
      assert.equal(result, expected, `should be ${expected}`);
    });
  });
});
