import Ember from 'ember';

const {
  A: emberArray,
  Helper,
  computed,
  defineProperty,
  get,
  isArray,
  observer,
  set
} = Ember;

const groupFunction = function() {
  let array = get(this, 'array');
  let byPath = get(this, 'byPath');
  let groups = Ember.Object.create();

  array.forEach((item) => {
    let groupName = get(item, byPath);
    let group = get(groups, groupName);

    if (!isArray(group)) {
      group = emberArray();
      set(groups, groupName, group);
    }

    group.push(item);
  });

  return groups;
};

export default Helper.extend({
  compute([array, byPath]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);

    return get(this, 'content');
  },

  array: null,
  byPath: null,
  content: null,

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
