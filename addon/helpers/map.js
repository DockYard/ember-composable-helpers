import Ember from 'ember';
import { map } from 'ember-computed';
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
