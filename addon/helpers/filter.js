import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import asArray from '../utils/as-array';

export function filter([callback, array]) {
  if (isEmpty(callback) || !array) {
    return [];
  }

  return asArray(array).filter(callback);
}

export default helper(filter);
