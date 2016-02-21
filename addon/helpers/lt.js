import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function lt([a, b]) {
  return a < b;
}

export default helper(lt);
