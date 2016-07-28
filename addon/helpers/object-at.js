import Helper from 'ember-helper';
import { A as emberArray, isEmberArray } from 'ember-array/utils';
import computed from 'ember-computed';
import observer from 'ember-metal/observer';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

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
