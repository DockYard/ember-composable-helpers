import Ember from 'ember';

const {
  Helper,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([array, separator = ',']) {
    set(this, 'array', array);
    return array.join(separator);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
