import Ember from 'ember';

const {
  Helper,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([takeAmount, array]) {
    set(this, 'array', array);
    return array.slice(0, takeAmount);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
