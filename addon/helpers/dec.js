import Ember from 'ember';

const { Helper: { helper }, isEmpty } = Ember;

export function dec([step, val]) {
  if (isEmpty(val)) {
    val = step;
    step = undefined;
  }

  step = step || 1;
  return val - step;
}

export default helper(dec);
