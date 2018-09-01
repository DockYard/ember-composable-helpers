import Helper from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import { filter } from '@ember/object/computed';
import { defineProperty, get, observer, set } from '@ember/object';
import { isEmpty } from '@ember/utils';

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
    let regex = new RegExp(value, 'i');

    if (isEmpty(byPath)) {
      defineProperty(this, 'content', []);
      return;
    }

    let cp = filter(`array.@each.${byPath}`, (item) => {
      return regex.test(get(item, byPath));
    });

    defineProperty(this, 'content', cp);
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
