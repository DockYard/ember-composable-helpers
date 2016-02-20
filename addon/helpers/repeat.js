import Ember from 'ember';

const {
  Helper: { helper },
  typeOf
} = Ember;

export function repeat([length, value]) {
  if (typeOf(length) !== 'number') {
    return [value];
  }

  return Array.apply(null, { length }).map(() => value);
}

export default helper(repeat);
