import Ember from 'ember';
import computed from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { A as emberArray } from 'ember-array/utils';
import { isEmpty } from 'ember-utils';

const { defineProperty } = Ember;

export default Helper.extend({
  compute([byPath, value, array]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);
    set(this, 'value', value);

    return get(this, 'content');
  },

  byPathDidChange: observer('byPath', function() {
    let byPath = get(this, 'byPath');

    if (isEmpty(byPath)) {
      defineProperty(this, 'content', []);
      return;
    }

    defineProperty(this, 'content', computed(`array.@each.${byPath}`, 'value', function() {
      let array = get(this, 'array');
      let value = get(this, 'value');

      return emberArray(array).findBy(byPath, value);
    }));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
