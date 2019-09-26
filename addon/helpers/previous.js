import { helper } from '@ember/component/helper';
import getIndex from '../utils/get-index';
import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';

export function previous(currentValue, array, useDeepEqual = false) {
  let currentIndex = getIndex(array, currentValue, useDeepEqual);

  if (isEmpty(currentIndex)) {
    return;
  }

  return currentIndex === 0 ? currentValue : emberArray(array).objectAt(currentIndex - 1);
}

export default helper(function(params) {
  let { currentValue, array, useDeepEqual } = getValueArrayAndUseDeepEqualFromParams(params);

  return previous(currentValue, array, useDeepEqual);
});
