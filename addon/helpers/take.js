import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function take([takeAmount, array]) {
  return asArray(array).slice(0, takeAmount);
}

export default helper(take);
