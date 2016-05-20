import {
  A as emberArray,
  isEmberArray as isArray
} from 'ember-array/utils';
import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export default Helper.extend({
  compute([start, end, array]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);

    return array.slice(start, end);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
