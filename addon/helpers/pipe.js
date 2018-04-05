import { helper } from '@ember/component/helper';
import { resolve, reject } from 'rsvp';

export function invokeFunction(acc, curr, idx) {
  return acc.then((things) => idx === 0 ? curr(...things) : curr(things));
}

export function pipe(actions = [], { catch: c, finally: f } = { }) {
  return function(...args) {
    return actions.reduce((acc, curr, idx) => invokeFunction(acc, curr, idx), resolve(args))
      .catch(c ? c : reject).finally(f ? f.bind(null, ...args) : (v) => v);
  };
}

export default helper(pipe);
