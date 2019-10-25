import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function compact([value]) {
  let array;
  if (Array.isArray(value)) {
    array = value;
  } else {
    array = [value];
  }

  return array.filter(item => isPresent(item));
}

export default helper(compact);
