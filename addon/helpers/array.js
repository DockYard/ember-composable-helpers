import { helper } from '@ember/component/helper';
import { A as emberArray } from '@ember/array';

export function array(params = []) {
  // slice params to avoid mutating the provided params
  return emberArray(params.slice());
}

export default helper(array);
