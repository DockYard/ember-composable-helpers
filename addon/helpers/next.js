import Ember from 'ember';
import getIndex from '../utils/get-index';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';

const { get, isEmpty } = Ember;

export function next(currentValue, array, useDeepEqual = false) {
  let currentIndex = getIndex(array, currentValue, useDeepEqual);
  let lastIndex = get(array, 'length') - 1;

  if (isEmpty(currentIndex)) {
    return;
  }

  return currentIndex === lastIndex ? currentValue : array[currentIndex + 1];
}

export default createNeedleHaystackHelper(next);
