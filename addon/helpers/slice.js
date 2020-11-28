import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function slice([...args]) {
  let array = args.pop();
  array = asArray(array);
  return array.slice(...args);
}

export default helper(slice);
