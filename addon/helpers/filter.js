import Ember from 'ember';
import { filter } from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isEmpty } from 'ember-utils';

const { defineProperty } = Ember;

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
