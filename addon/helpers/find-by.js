import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';

export function findBy([byPath, value, array]) {
  if (isEmpty(byPath)) {
    return [];
  }

  return emberArray(array).findBy(byPath, value);
}

export default helper(findBy);
