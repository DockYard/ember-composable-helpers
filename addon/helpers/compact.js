import {
  A as emberArray,
  isEmberArray
} from 'ember-array/utils';
import { filter } from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isPresent } from 'ember-utils';

export default Helper.extend({
  compute([array]) {
    if (!isEmberArray(array)) {
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
