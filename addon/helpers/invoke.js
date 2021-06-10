import { isArray as isEmberArray } from '@ember/array';
import { helper } from '@ember/component/helper';
import RSVP from 'rsvp';

const { all } = RSVP;

export function invoke([methodName, ...args]) {
  let obj = args.pop();

  if (isEmberArray(obj)) {
    return function() {
      let promises = obj.map((item) => item[methodName]?.(...args));

      return all(promises);
    };
  }

  return function() {
    return obj[methodName]?.(...args);
  };
}

export default helper(invoke);
