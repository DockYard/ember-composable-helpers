import { helper } from '@ember/component/helper';

export function entries([object]) {
  if (!object) {
    return object;
  }
  return Object.entries(object);
}

export default helper(entries);
