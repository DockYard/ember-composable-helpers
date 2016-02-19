import Ember from 'ember';

const {
  Helper,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([array, dropAmount]) {
    set(this, 'array', array);
    return array.slice(dropAmount);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});

