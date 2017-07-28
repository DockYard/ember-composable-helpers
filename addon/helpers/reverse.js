import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { set } from '@ember/object';

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
