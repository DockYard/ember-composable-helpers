import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';

export function repeat([length, value]) {
  if (typeOf(length) !== 'number') {
    return [value];
  }
  return Array.apply(null, { length }).map(() => value); // eslint-disable-line
}

export default helper(repeat);
