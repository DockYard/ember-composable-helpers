import Ember from 'ember';

const {
  Helper,
  get,
  set,
  observer,
  isArray,
  A: emberArray,
  computed: { uniq }
} = Ember;

export default Helper.extend({
  compute([array]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);

    return get(this, 'content');
  },

  content: uniq('array'),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
