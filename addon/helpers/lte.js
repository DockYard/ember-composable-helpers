import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function lte([a, b]) {
  return a <= b;
}

export default helper(lte);
