import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { A as emberArray } from '@ember/array';
import asArray from '../utils/as-array';

export function findBy([byPath, value, array]) {
  if (isEmpty(byPath)) {
    return [];
  }

  return emberArray(asArray(array)).findBy(byPath, value);
}

export default helper(findBy);
