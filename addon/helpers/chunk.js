import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
const { max, ceil } = Math;
import asArray from '../utils/as-array';

export function chunk(num, array) {
  let integer = parseInt(num, 10);
  let size = max(integer, 0);

  let length = 0;
  if (isEmberArray(array)) {
    length = array.length;
  }

  array = asArray(array)

  if (!length || size < 1) {
    return [];
  } else {
    let index = 0;
    let resultIndex = -1;
    let result = new Array(ceil(length / size));

    while (index < length) {
      result[++resultIndex] = array.slice(index, (index += size));
    }

    return result;
  }
}

export default helper(function([num, array]) {
  return chunk(num, array);
});
