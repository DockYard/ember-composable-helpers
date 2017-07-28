import { isArray as isEmberArray } from '@ember/array';
import { computed } from '@ember/object';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';

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
