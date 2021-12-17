import { helper } from '@ember/component/helper';
import isPromise from '../utils/is-promise';

export function invokeFunction(acc, curr) {
  if (isPromise(acc)) {
    return acc.then(curr);
  }

  return curr.call(this, acc);
}

export function pipe(actions = [], { target } = {}) {
  return function(...args) {
    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr.call(target || this, ...args);
      }

      return invokeFunction.call(target || this, acc, curr);
    }, undefined);
  };
}

export default helper(pipe);
