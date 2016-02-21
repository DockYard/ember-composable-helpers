import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function gte([a, b]) {
  return a >= b;
}

export default helper(gte);
