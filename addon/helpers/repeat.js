import { helper } from 'ember-helper';
import { typeOf } from 'ember-utils';

export function repeat([length, value]) {
  if (typeOf(length) !== 'number') {
    return [value];
  }

  return Array.apply(null, { length }).map(() => value); // eslint-disable-line prefer-spread
}

export default helper(repeat);
