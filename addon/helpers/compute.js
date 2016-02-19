import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function compute([action, ...params]) {
  return action(...params);
}

export default helper(compute);
