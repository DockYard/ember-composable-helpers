import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function map([callback, array]) {
  if (isEmpty(callback)) {
    return [];
  }

  return array.map(callback);
}

export default helper(map);
