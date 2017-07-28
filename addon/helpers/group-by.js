import emberObject, { defineProperty } from '@ember/object';
import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import { computed } from '@ember/object';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';

const groupFunction = function() {
  let array = get(this, 'array');
  let byPath = get(this, 'byPath');
  let groups = emberObject.create();

  array.forEach((item) => {
    let groupName = get(item, byPath);
    let group = get(groups, groupName);

    if (!isEmberArray(group)) {
      group = emberArray();
      groups[`${groupName}`] = group;
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
