import Ember from 'ember';

const { Helper: { helper }, get, set } = Ember;

export function toggle([obj, prop]) {
  return function() {
    set(obj, prop, !get(obj, prop));
  };
}

export default helper(toggle);
