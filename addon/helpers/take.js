import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export default Helper.extend({
  compute([takeAmount, array]) {
    set(this, 'array', array);
    return array.slice(0, takeAmount);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
