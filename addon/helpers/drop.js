import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { set } from '@ember/object';

export default Helper.extend({
  compute([dropAmount, array]) {
    set(this, 'array', array);
    return array.slice(dropAmount);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
