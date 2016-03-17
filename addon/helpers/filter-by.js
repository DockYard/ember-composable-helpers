import Ember from 'ember';

const {
  Helper,
  computed: { filter },
  defineProperty,
  get,
  isArray,
  isEmpty,
  isPresent,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute([byPath, value, array]) {

    if (!isArray(array) && isArray(value)) {
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
