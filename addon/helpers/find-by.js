import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import asArray from '../utils/as-array';

export function findBy([byPath, value, array]) {
  if (isEmpty(byPath)) {
    return [];
  }

  return asArray(array).find((item) => {
    return get(item, byPath) === value;
  });
}

export default helper(findBy);
