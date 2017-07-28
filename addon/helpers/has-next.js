import { isPresent } from '@ember/utils';
import { next } from './next';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';
import isEqual from '../utils/is-equal';

export function hasNext(currentValue, array, useDeepEqual = false) {
  let nextValue = next(currentValue, array, useDeepEqual);
  let isNotSameValue = !isEqual(nextValue, currentValue, useDeepEqual);

  return isNotSameValue && isPresent(nextValue);
}

export default createNeedleHaystackHelper(hasNext);
