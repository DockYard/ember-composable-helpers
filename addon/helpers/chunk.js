import { isEmberArray } from 'ember-array/utils';
import computed from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

const { max, ceil } = Math;

export function chunk(num, array) {
  let integer = parseInt(num, 10);
  let size = max(integer, 0);

  let length = 0;
  if (isEmberArray(array)) {
    length = get(array, 'length');
  }

  if (!length || size < 1) {
    return [];
  } else {
    let index = 0;
    let resultIndex = -1;
    let result = new Array(ceil(length / size));

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
