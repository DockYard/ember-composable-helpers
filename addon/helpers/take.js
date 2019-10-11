import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { set } from '@ember/object';

export default Helper.extend({
  compute([takeAmount, array]) {
    if (!array) {
      array = [];
    }
    set(this, 'array', array);
    return array.slice(0, takeAmount);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
