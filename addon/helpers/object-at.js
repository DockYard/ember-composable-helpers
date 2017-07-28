import Helper from '@ember/component/helper';
import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { get } from '@ember/object';
import { set } from '@ember/object';

export function objectAt(index, array) {
  if (!isEmberArray(array)) {
    return undefined;
  }

  index = parseInt(index, 10);

  return emberArray(array).objectAt(index);
}

export default Helper.extend({
  content: computed('index', 'array.[]', function() {
    let index = get(this, 'index');
    let array = get(this, 'array');

    return objectAt(index, array);
  }),

  compute([index, array]) {
    set(this, 'index', index);
    set(this, 'array', array);

    return get(this, 'content');
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
