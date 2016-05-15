import Ember from 'ember';

export function length(params/*, hash*/) {
  return params[0].length;
}

export default Ember.Helper.helper(length);
