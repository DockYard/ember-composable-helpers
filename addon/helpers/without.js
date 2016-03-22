import { A as emberArray } from 'ember-array/utils';
import { typeOf } from 'ember-utils';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';

function contains(needle, haystack) {
  return emberArray(haystack).contains(needle);
}

export function without(needle, haystack) {
  if (typeOf(haystack) !== 'array') {
    return false;
  }

  if (typeOf(needle) === 'array' && needle.length) {
    return haystack.reduce((acc, val) => contains(val, needle) ? acc : acc.concat(val), []);
  }

  return emberArray(haystack).without(needle);
}

export default createNeedleHaystackHelper(without);
