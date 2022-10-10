import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import arrayAt from '../utils/array-at';

export function objectAt(index, array) {
  if (!isEmberArray(array)) {
    return undefined;
  }

  index = parseInt(index, 10);

  return arrayAt(array, index);
}

export default helper(function([index, array]) {
  return objectAt(index, array);
});
