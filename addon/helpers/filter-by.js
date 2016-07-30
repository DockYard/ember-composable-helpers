import Ember from 'ember';
import { isEmberArray } from 'ember-array/utils';
import { filter } from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isEmpty, isPresent } from 'ember-utils';

const { defineProperty } = Ember;

export default Helper.extend({
  compute([byPath, value, array]) {
    if (!isEmberArray(array) && isEmberArray(value)) {
      array = value;
      value = undefined;
    }

    set(this, 'array', array);
    set(this, 'byPath', byPath);
    set(this, 'value', value);

    return get(this, 'content');
  },

  byPathDidChange: observer('byPath', 'value', function() {
    let byPath = get(this, 'byPath');
    let value = get(this, 'value');

    if (isEmpty(byPath)) {
      defineProperty(this, 'content', []);
      return;
    }

    let filterFn;

    if (isPresent(value)) {
      if (typeof value === 'function') {
        filterFn = (item) => value(get(item, byPath));
      } else {
        filterFn = (item) => get(item, byPath) === value;
      }
    } else {
      filterFn = (item) => isPresent(get(item, byPath));
    }

    let cp = filter(`array.@each.${byPath}`, filterFn);

    defineProperty(this, 'content', cp);
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
