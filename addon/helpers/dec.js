import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function dec([val, step]) {
  step = step || 1;
  return val - step;
}

export default helper(dec);
