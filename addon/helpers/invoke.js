import Ember from 'ember';

const {
  RSVP: {all},
  Helper: { helper },
  isArray,
  tryInvoke
} = Ember;

export function invoke([methodName, ...args]) {
  let obj = args.pop();
  if (isArray(obj)) {
    return function() {
      return all(
        obj.map((item) => tryInvoke(item, methodName, args))
      );
    };
  } else {
    return function() {
      return tryInvoke(obj, methodName, args);
    };
  }
}

export default helper(invoke);

