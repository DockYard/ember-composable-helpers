import { isPresent } from '@ember/utils';
import { previous } from './previous';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';
import isEqual from '../utils/is-equal';

export function hasPrevious(currentValue, array, useDeepEqual = false) {
  let previousValue = previous(currentValue, array, useDeepEqual);
  let isNotSameValue = !isEqual(previousValue, currentValue, useDeepEqual);

  return isNotSameValue && isPresent(previousValue);
}

export default createNeedleHaystackHelper(hasPrevious);
