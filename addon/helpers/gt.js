import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function gt([a, b]) {
  return a > b;
}

export default helper(gt);
