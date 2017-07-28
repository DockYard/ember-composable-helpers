import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import { get } from '@ember/object';
import { typeOf } from '@ember/utils';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';
import includes from '../utils/includes';

function contains(needle, haystack) {
  return includes(emberArray(haystack), needle);
}

export function without(needle, haystack) {
  if (!isEmberArray(haystack)) {
    return false;
  }

  if (typeOf(needle) === 'array' && get(needle, 'length')) {
    return haystack.reduce((acc, val) => contains(val, needle) ? acc : acc.concat(val), []);
  }

  return emberArray(haystack).without(needle);
}

export default createNeedleHaystackHelper(without);
