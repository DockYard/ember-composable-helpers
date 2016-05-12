import { helper } from 'ember-helper';
import { isEmpty } from 'ember-utils';

export function inc([step, val]) {
  if (isEmpty(val)) {
    val = step;
    step = undefined;
  }

  if (step === undefined) {
    step = 1;
  }

  return val + step;
}

export default helper(inc);
