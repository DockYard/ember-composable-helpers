import Ember from 'ember';

const {
  Helper,
  get,
  set,
  observer,
  isPresent,
  isArray,
  A: emberArray,
  computed: { filter }
} = Ember;

export default Helper.extend({
  compute([array]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);

    return get(this, 'content');
  },

  content: filter('array', isPresent),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
