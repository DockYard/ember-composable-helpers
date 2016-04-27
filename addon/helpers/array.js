import Ember from 'ember';
import { A as emberArray } from 'ember-array/utils';

export function array(params) {
  return emberArray(params);
}

export default Ember.Helper.helper(array);
