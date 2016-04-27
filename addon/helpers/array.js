import { helper } from 'ember-helper';
import { A as emberArray } from 'ember-array/utils';

export function array(params) {
  return emberArray(params);
}

export default helper(array);
