import { helper } from 'ember-helper';

export function optional([action, ...args]) {
  if (typeof action === 'function') {
    return action.bind(this, ...args);
  }

  return (i) => i;
}

export default helper(optional);
