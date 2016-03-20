import { helper } from 'ember-helper';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export function toggle([prop, obj]) {
  return function() {
    set(obj, prop, !get(obj, prop));
  };
}

export default helper(toggle);
