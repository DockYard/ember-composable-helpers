import { helper } from 'ember-helper';
import { A as emberArray } from 'ember-array/utils';

export function array(params = []) {
  // slice params to avoid mutating the provided params
  return emberArray(params.slice());
}

export default helper(array);
