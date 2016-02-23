import Ember from 'ember';

const {
  Helper: { helper },
  typeOf
} = Ember;

export function pipe(actions = []) {
  return function(...args) {
    return actions.reduce((acc, curr) => {
      if (typeOf(acc) === 'undefined') {
        return curr(...args);
      }

      return curr(acc);
    }, undefined);
  };
}

export default helper(pipe);
