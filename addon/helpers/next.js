import { helper } from '@ember/component/helper';
import getIndex from '../utils/get-index';
import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';

export function next(currentValue, array, useDeepEqual = false) {
  if (!array) {
    array = [];
  }
  let currentIndex = getIndex(array, currentValue, useDeepEqual);
  let lastIndex = array.length - 1;

  if (isEmpty(currentIndex)) {
    return;
  }

  return currentIndex === lastIndex ? currentValue : emberArray(array).objectAt(currentIndex + 1);
}

export default helper(function(params) {
  let { currentValue, array, useDeepEqual } = getValueArrayAndUseDeepEqualFromParams(params);

  return next(currentValue, array, useDeepEqual);
});
