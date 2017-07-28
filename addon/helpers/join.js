import { isArray as isEmberArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { set } from '@ember/object';

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
