import { helper } from '@ember/component/helper';
import isPromise from '../utils/is-promise';

export function queue(actions = []) {
  return function(...args) {
    let invokeWithArgs = function(acc, curr) {
      if (isPromise(acc)) {
        return acc.then(() => curr(...args));
      }

      return curr(...args);
    };

    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr(...args);
      }

      return invokeWithArgs(acc, curr);
    }, undefined);
  };
}

export default helper(queue);
