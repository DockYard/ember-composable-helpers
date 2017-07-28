import { defineProperty } from '@ember/object';
import { map } from '@ember/object/computed';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Helper.extend({
  compute([callback, array]) {
    set(this, 'array', array);
    set(this, 'callback', callback);

    return get(this, 'content');
  },

  byPathDidChange: observer('callback', function() {
    let callback = get(this, 'callback');

    if (isEmpty(callback)) {
      defineProperty(this, 'content', []);
      return;
    }

    defineProperty(this, 'content', map('array', callback));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
