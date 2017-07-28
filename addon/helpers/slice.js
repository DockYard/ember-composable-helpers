import Helper from '@ember/component/helper';
import { observer } from '@ember/object';
import { set } from '@ember/object';

export default Helper.extend({
  compute([start, end, array]) {
    set(this, 'array', array);
    return array.slice(start, end);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
