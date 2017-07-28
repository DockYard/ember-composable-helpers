import { defineProperty } from '@ember/object';
import { filter } from '@ember/object/computed';
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

  callbackDidChange: observer('callback', function() {
    let callback = get(this, 'callback');

    if (isEmpty(callback)) {
      defineProperty(this, 'content', []);
      return;
    }

    let cp = filter('array', callback);

    defineProperty(this, 'content', cp);
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
