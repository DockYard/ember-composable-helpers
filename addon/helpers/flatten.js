import Ember from 'ember';

const {
  Helper,
  observer,
  set,
  isArray
} = Ember;

// lodash's flatten method doesn't work on Ember arrays
export function flatten(array) {
  if (!isArray(array)) {
    return array;
  }

  return array.reduce((flattened, el) => {
    if (isArray(el)) {
      return flattened.concat(flatten(el));
    }

    return flattened.concat(el);
  }, []);
}

export default Helper.extend({
  compute([array]) {
    set(this, 'array', array);

    return flatten(array);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
