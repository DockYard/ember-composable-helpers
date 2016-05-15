import Ember from 'ember';

export function slice(params = [], hash = {}) {
  const start = isNaN(params[0]) ? hash.start : params[0];
  const end =   isNaN(params[1]) ? hash.end : params[1];
  const array = params[2] || hash.array;

  return array.slice(start, end);
}

export default Ember.Helper.helper(slice);
