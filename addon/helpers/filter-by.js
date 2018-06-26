import { defineProperty } from '@ember/object';
import { isArray as isEmberArray } from '@ember/array';
import { filter } from '@ember/object/computed';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';
import isEqual from '../utils/is-equal';

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
        filterFn = (item) => isEqual(get(item, byPath), value);
      }
    } else {
      filterFn = (item) => !!get(item, byPath);
    }

    let [minimumByPath]  = byPath.split('.');
    let cp = filter(`array.@each.${minimumByPath}`, filterFn);

    defineProperty(this, 'content', cp);
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
