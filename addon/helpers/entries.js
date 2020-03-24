import { helper } from '@ember/component/helper';

export function keys([object]) {
  if (!object) {
    return object;
  }
  return Object.entries(object);
}

export default helper(keys);
