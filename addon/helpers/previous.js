import Ember from 'ember';
import getIndex from '../utils/get-index';
import createNeedleHaystackHelper from '../-private/create-needle-haystack-helper';

const { isEmpty } = Ember;

export function previous(currentValue, array, useDeepEqual = false) {
  let currentIndex = getIndex(array, currentValue, useDeepEqual);

  if (isEmpty(currentIndex)) {
    return;
  }

  return currentIndex === 0 ? currentValue : array[currentIndex - 1];
}

export default createNeedleHaystackHelper(previous);
