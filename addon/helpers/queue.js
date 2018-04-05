import { helper } from '@ember/component/helper';
import { reject, resolve } from 'rsvp';

export function queue(actions = [], { catch: c, finally: f } = { }) {
  return function(...args) {
    let invokeWithArgs = function(acc, curr) {
      return acc.then(() => curr(...args));
    };

    return actions.reduce((acc, curr) => invokeWithArgs(acc, curr), resolve(...args))
      .catch(c ? c : reject).finally(f ? f : (v) => v);
  };
}

export default helper(queue);
