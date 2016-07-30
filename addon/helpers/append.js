import computed from 'ember-computed';
import get from 'ember-metal/get';
import { isEmberArray } from 'ember-array/utils';
import createMultiArrayHelper from '../-private/create-multi-array-helper';

export function append(...dependentKeys) {
  dependentKeys = dependentKeys || [];
  let arrayKeys = dependentKeys.map((dependentKey) => {
    return `${dependentKey}.[]`;
  });

  return computed(...arrayKeys, function() {
    let array = dependentKeys.map((dependentKey) => {
      let value = get(this, dependentKey);
      return isEmberArray(value) ? value.toArray() : [value];
    });

    return [].concat(...array);
  });
}

export default createMultiArrayHelper(append);
