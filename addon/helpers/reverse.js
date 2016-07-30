import {
  A as emberArray,
  isEmberArray
} from 'ember-array/utils';
import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export default Helper.extend({
  compute([array]) {
    if (!isEmberArray(array)) {
      return [array];
    }

    set(this, 'array', array);
    return emberArray(array).slice(0).reverse();
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
