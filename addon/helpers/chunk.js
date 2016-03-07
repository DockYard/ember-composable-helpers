import Ember from 'ember';

const {
  A: slice,
  Helper,
  isArray,
  computed,
  observer,
  set,
  get
} = Ember;

export function chunk(num, array) {
  let integer = parseInt(num, 10);
  let size = Math.max(integer, 0);
  let length = isArray(array) ? array.length : 0;

  if (!length || size < 1) {
    return [];
  } else {
    let index = 0;
    let resultIndex = -1;
    let result = Array(Math.ceil(length / size));

    while (index < length) {
      result[++resultIndex] = array.slice(index, (index += size));
    }

    return result;
  }
}

export default Helper.extend({
  content: computed('num', 'array.[]', function() {
    let array = get(this, 'array');
    let num = get(this, 'num');

    return chunk(num, array);
  }),

  compute([num, array]) {
    set(this, 'array', array);
    set(this, 'num', num);

    return get(this, 'content');
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
