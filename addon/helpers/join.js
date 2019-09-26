import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';

function join([separator, array]) {
  if (isEmberArray(separator)) {
    array = separator;
    separator = ',';
  }

  return array.join(separator);
}

export default helper(join);
