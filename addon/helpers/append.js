import { computed } from '@ember/object';
import { get } from '@ember/object';
import { isArray as isEmberArray } from '@ember/array';
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
