import Ember from 'ember';

const { Helper: { helper }, get, set } = Ember;

export function toggle([prop, obj]) {
  return function() {
    set(obj, prop, !get(obj, prop));
  };
}

export default helper(toggle);
