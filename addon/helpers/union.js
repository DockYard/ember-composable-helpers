import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function union([...arrays]) {
  let items = [].concat(...arrays);

  return items.filter((value, index, array) => asArray(array).indexOf(value) === index);
}

export default helper(union);
