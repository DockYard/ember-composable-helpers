import { helper } from 'ember-helper';

export function compute([action, ...params]) {
  return action(...params);
}

export default helper(compute);
