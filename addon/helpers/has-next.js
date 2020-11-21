import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';
import { next } from './next';
import isEqual from '../utils/is-equal';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';
import asArray from '../utils/as-array';

export function hasNext(currentValue, maybeArray, useDeepEqual = false) {
  let array = asArray(maybeArray);
  let nextValue = next(currentValue, array, useDeepEqual);
  let isNotSameValue = !isEqual(nextValue, currentValue, useDeepEqual);

  return isNotSameValue && isPresent(nextValue);
}

export default helper(function(params) {
  let { currentValue, array, useDeepEqual } = getValueArrayAndUseDeepEqualFromParams(params);

  return hasNext(currentValue, array, useDeepEqual);
});
