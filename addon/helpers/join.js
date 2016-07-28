import { isEmberArray } from 'ember-array/utils';
import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export default Helper.extend({
  compute([separator, array]) {
    if (isEmberArray(separator)) {
      array = separator;
      separator = ',';
    }

    set(this, 'array', array);
    return array.join(separator);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
