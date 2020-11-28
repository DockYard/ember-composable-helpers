import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import asArray from '../utils/as-array';

export function reduce([callback, initialValue, array]) {
  if (isEmpty(callback)) {
    return [];
  }

  return asArray(array).reduce(callback, initialValue);
}

export default helper(reduce);
