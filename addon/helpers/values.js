import { helper } from '@ember/component/helper';

export function values([object]) {
  if (!object) {
    return object;
  }
  return Object.values(object);
}

export default helper(values);
