import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function reduce([callback, initialValue, array]) {
  if (isEmpty(callback)) {
    return [];
  }

  return array.reduce(callback, initialValue);
}

export default helper(reduce);
