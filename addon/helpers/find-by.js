import Ember from 'ember';

const {
  Helper,
  computed,
  defineProperty,
  get,
  isEmpty,
  observer,
  set
} = Ember;

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

    defineProperty(this, 'content', computed(`array.@each.${byPath}`, function() {
      let array = get(this, 'array');
      let value = get(this, 'value');

      return array.findBy(byPath, value);
    }));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
