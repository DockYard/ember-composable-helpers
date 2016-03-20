import { helper } from 'ember-helper';
import { isEmpty } from 'ember-utils';

export function inc([step, val]) {
  if (isEmpty(val)) {
    val = step;
    step = undefined;
  }

  step = step || 1;
  return val + step;
}

export default helper(inc);
