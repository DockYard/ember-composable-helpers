import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

function reduce([callback, initialValue, array]) {
  if (isEmpty(callback)) {
    return [];
  }

  return array.reduce(callback, initialValue);
}

export default helper(reduce);
