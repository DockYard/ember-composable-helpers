import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';
import { previous } from './previous';
import isEqual from '../utils/is-equal';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';

export function hasPrevious(currentValue, array, useDeepEqual = false) {
  if (!array) {
    array = [];
  }
  let previousValue = previous(currentValue, array, useDeepEqual);
  let isNotSameValue = !isEqual(previousValue, currentValue, useDeepEqual);

  return isNotSameValue && isPresent(previousValue);
}

export default helper(function(params) {
  let { currentValue, array, useDeepEqual } = getValueArrayAndUseDeepEqualFromParams(params);

  return hasPrevious(currentValue, array, useDeepEqual);
});
