import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import asArray from '../utils/as-array';

export function join([separator, rawArray]) {
  let array = asArray(rawArray);

  if (isEmberArray(separator)) {
    array = separator;
    separator = ',';
  }

  return array.join(separator);
}

export default helper(join);
