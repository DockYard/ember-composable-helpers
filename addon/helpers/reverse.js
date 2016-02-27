import Ember from 'ember';

const {
  A: emberArray,
  Helper,
  observer,
  isArray,
  set
} = Ember;

export default Helper.extend({
  compute([array]) {
    if (!isArray(array)) {
      return [array];
    }

    set(this, 'array', array);
    return emberArray(array).slice(0).reverse();
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
