import Ember from 'ember';
import {
  A as emberArray,
  isEmberArray
} from 'ember-array/utils';
import computed from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

const { defineProperty, Object: emberObject } = Ember;

const groupFunction = function() {
  let array = get(this, 'array');
  let byPath = get(this, 'byPath');
  let groups = emberObject.create();

  array.forEach((item) => {
    let groupName = get(item, byPath);
    let group = get(groups, groupName);

    if (!isEmberArray(group)) {
      group = emberArray();
      set(groups, groupName, group);
    }

    group.push(item);
  });

  return groups;
};

export default Helper.extend({
  compute([byPath, array]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);

    return get(this, 'content');
  },

  byPathDidChange: observer('byPath', function() {
    let byPath = get(this, 'byPath');

    if (byPath) {
      defineProperty(this, 'content', computed(`array.@each.${byPath}`, groupFunction));
    } else {
      defineProperty(this, 'content', null);
    }
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
