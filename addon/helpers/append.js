import Ember from 'ember';

const {
  A: emberArray,
  Helper,
  computed,
  defineProperty,
  get,
  getProperties,
  guidFor,
  isArray,
  isEmpty,
  observer,
  set
} = Ember;

const idForArray = (array) => `__array-${guidFor(array)}`;

export function append(...dependentKeys) {
  dependentKeys = dependentKeys || [];
  let arrayKeys = dependentKeys.map((dependentKey) => {
    return `${dependentKey}.[]`;
  });
  return computed(...arrayKeys, function() {
    let array = dependentKeys.map((dependentKey) => {
      let value = get(this, dependentKey);
      return isArray(value) ? value.toArray() : [value];
    });

    return [].concat(...array);
  });
};

export default Helper.extend({
  compute([...arrays]) {
    set(this, 'arrays', arrays);

    return get(this, 'content');
  },

  valuesDidChange: observer('arrays.[]', function() {
    let arrays = get(this, 'arrays');

    let oldArrayKeys = get(this, 'arrayKeys') || [];
    let newArrayKeys = arrays.map(idForArray);

    let keysToRemove = oldArrayKeys.filter((key) => {
      return newArrayKeys.indexOf(key) === -1;
    });

    keysToRemove.forEach((key) => set(this, key, null));
    arrays.forEach((array) => set(this, idForArray(array), array));

    set(this, 'arrayKeys', newArrayKeys);

    if (isEmpty(arrays)) {
      defineProperty(this, 'content', []);
      return;
    }

    defineProperty(this, 'content', append(...newArrayKeys));
  }),

  contentDidChange: observer('content.[]', function() {
    this.recompute();
  })
});
