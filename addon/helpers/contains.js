import { A as emberArray } from 'ember-array/utils';
import get from 'ember-metal/get';
import { typeOf } from 'ember-utils';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';

function _contains(needle, haystack) {
  return emberArray(haystack).contains(needle);
}

export function contains(needle, haystack) {
  if (typeOf(haystack) !== 'array') {
    return false;
  }

  if (typeOf(needle) === 'array' && get(needle, 'length')) {
    return needle.reduce((acc, val) => acc && _contains(val, haystack), true);
  }

  return _contains(needle, haystack);
}

export default createNeedleHaystackHelper(contains);
