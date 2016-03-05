import Ember from 'ember';
import isPromise from '../utils/is-promise';

const { Helper: { helper } } = Ember;

export function invokeFunction(acc, curr) {
  if (isPromise(acc)) {
    return acc.then(curr);
  }

  return curr(acc);
}

export function pipe(actions = []) {
  return function(...args) {
    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr(...args);
      }

      return invokeFunction(acc, curr);
    }, undefined);
  };
}

export default helper(pipe);
