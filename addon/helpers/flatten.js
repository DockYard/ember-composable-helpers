import Ember from 'ember';
import Helper from 'ember-helper'
import { isEmberArray as isArray } from 'ember-array/utils';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export function flatten(array) {
  if (!isArray(array)) {
    return array;
  }

  return array.reduce((flattened, el) => {
    return flattened.concat(flatten(el));
  }, []);
}

export default Helper.extend({
  compute([array]) {
    set(this, 'array', array);

    return flatten(array);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
