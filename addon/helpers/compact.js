import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import { filter } from '@ember/object/computed';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { isPresent } from '@ember/utils';

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
