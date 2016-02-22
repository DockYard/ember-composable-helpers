import Ember from 'ember';
import {
  A as emberArray,
  isEmberArray as isArray
} from 'ember-array/utils';
import computed from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isPresent, typeOf } from 'ember-utils';
const { defineProperty } = Ember;
const { keys } = Object;

// For compacting object instances
export function compact(objectInstance) {
  return keys(objectInstance).reduce((compactedObject, key) => {
    let val = objectInstance[key];
    if (isPresent(val)) {
      compactedObject[key] = val;
    }
    return compactedObject;
  }, {});
}

export default Helper.extend({
  compute([arrayOrObject]) {
    set(this, 'arrayOrObject', arrayOrObject);

    if (isArray(arrayOrObject)) {
      this.makeComputedForArray(arrayOrObject);
    } else if (typeOf(arrayOrObject) === 'object' || typeOf(arrayOrObject) === 'instance') {
      this.makeComputedForObject(arrayOrObject);
    } else {
      return emberArray([arrayOrObject]);
    }

    return get(this, 'content');
  },

  makeComputedForArray(array) {
    defineProperty(this, 'content', computed('arrayOrObject.[]', function() {
      return get(this, 'arrayOrObject').filter((item) => isPresent(item));
    }));
  },

  makeComputedForObject(object) {
    let currentKeys = keys(object);
    let dependentKey = `arrayOrObject.\{${currentKeys.join(',')}\}`;
    defineProperty(this, 'content', computed(dependentKey, function() {
      return compact(get(this, 'arrayOrObject'));
    }));
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
