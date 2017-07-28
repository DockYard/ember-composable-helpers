import { A as emberArray } from '@ember/array';
import isEqual from '../utils/is-equal';

export default function getIndex(array, currentValue, useDeepEqual) {
  let needle = currentValue;

  if (useDeepEqual) {
    needle = emberArray(array).find((object) => {
      return isEqual(object, currentValue, useDeepEqual);
    });
  }

  let index = emberArray(array).indexOf(needle);

  return index >= 0 ? index : null;
}
