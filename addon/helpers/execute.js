import { helper } from '@ember/component/helper';
import isPromise from '../utils/is-promise';

export function execute(actions = []) {
  return function() {
    let invoke = function(acc, curr) {
      if (isPromise(acc)) {
        return acc.then(curr);
      }

      return curr();
    };

    return actions.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr();
      }

      return invoke(acc, curr);
    }, undefined);
  };
}

export default helper(execute);


