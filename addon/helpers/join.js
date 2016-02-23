import Ember from 'ember';

const {
  Helper,
  observer,
  isArray,
  set
} = Ember;

export default Helper.extend({
  compute([separator, array]) {
    if (isArray(separator)) {
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
