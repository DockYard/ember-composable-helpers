import { helper } from '@ember/component/helper';

export function compute([action, ...params]) {
  return action(...params);
}

export default helper(compute);
