import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function pipe(actions = []) {
  return function(...args) {
    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr(...args);
      }

      return curr(acc);
    }, undefined);
  };
}

export default helper(pipe);
