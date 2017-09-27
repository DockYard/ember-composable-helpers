import Helper from '@ember/component/helper';
import { sort } from '@ember/object/computed';
import { observer } from '@ember/object';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { compare } from '@ember/utils';

export default Helper.extend({
  content: sort('array', compare),

  compute([array]) {
    set(this, 'array', array);

    return get(this, 'content');
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
