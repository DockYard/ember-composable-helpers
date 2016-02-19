import Ember from 'ember';

const {
  Helper,
  computed: { mapBy },
  defineProperty,
  get,
  isArray,
  isEmpty,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([array, byPath]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);

    return get(this, 'content');
  },

  array: null,
  byPath: null,
  content: null,

  byPathDidChange: observer('byPath', function() {
    let byPath = get(this, 'byPath');

    if (isEmpty(byPath)) {
      defineProperty(this, 'content', []);
      return;
    }

    defineProperty(this, 'content', mapBy('array', byPath));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
