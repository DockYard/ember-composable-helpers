import Ember from 'ember';

const {
  A: emberArray,
  Helper,
  computed,
  typeOf,
  observer,
  set,
  get
} = Ember;

function _contains(needle, haystack) {
  return emberArray(haystack).contains(needle);
}

export function contains(needle, haystack) {
  if (typeOf(haystack) !== 'array') {
    return false;
  }

  if (typeOf(needle) === 'array' && needle.length) {
    return needle.reduce((acc, val) => acc && _contains(val, haystack), true);
  }

  return _contains(needle, haystack);
}

export default Helper.extend({
  needle: null,
  haystack: null,

  content: computed('needle.[]', 'haystack.[]', function() {
    let needle = get(this, 'needle');
    let haystack = get(this, 'haystack');

    return contains(needle, haystack);
  }).readOnly(),

  compute([needle, haystack]) {
    set(this, 'needle', needle);
    set(this, 'haystack', haystack);

    return get(this, 'content');
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
