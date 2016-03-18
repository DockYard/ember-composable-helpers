import Ember from 'ember';

const {
  Helper,
  computed: { mapBy },
  defineProperty,
  get,
  isEmpty,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([byPath, array]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);

    return get(this, 'content');
  },

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
