import { helper } from '@ember/component/helper';
import { A as emberArray, isArray as isEmberArray } from '@ember/array';

export function objectAt(index, array) {
  if (!isEmberArray(array)) {
    return undefined;
  }

  index = parseInt(index, 10);

  return emberArray(array).objectAt(index);
}

export default helper(function([index, array]) {
  return objectAt(index, array);
});
