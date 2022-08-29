import { helper } from '@ember/component/helper';
import isPromise from '../utils/is-promise';

function invokeMaybeNullable(curr, args) {
  return curr == null ? undefined : curr(...args);
}

export function queue(actions = []) {
  return function(...args) {
    let invokeWithArgs = function(acc, curr) {
      if (isPromise(acc)) {
        return acc.then(() => invokeMaybeNullable(curr, args));
      }

      return invokeMaybeNullable(curr, args);
    };

    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return invokeMaybeNullable(curr, args);
      }

      return invokeWithArgs(acc, curr);
    }, undefined);
  };
}

export default helper(queue);
