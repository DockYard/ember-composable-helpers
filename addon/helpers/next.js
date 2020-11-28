import { helper } from '@ember/component/helper';
import getIndex from '../utils/get-index';
import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';
import asArray from '../utils/as-array';

export function next(currentValue, maybeArray, useDeepEqual = false) {
  let array = asArray(maybeArray);
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
