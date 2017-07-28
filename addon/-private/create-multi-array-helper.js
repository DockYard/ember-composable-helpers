import { defineProperty } from '@ember/object';
import { A as emberArray, isArray as isEmberArray } from '@ember/array';
import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { observer } from '@ember/object';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { isEmpty } from '@ember/utils';

const idForArray = (array) => `__array-${guidFor(array)}`;

export default function(multiArrayComputed) {
  return Helper.extend({
    compute([...arrays]) {
      set(this, 'arrays', arrays.map((obj) => {
        if (isEmberArray(obj)) {
          return emberArray(obj);
        }

        return obj;
      }));

      return get(this, 'content');
    },

    valuesDidChange: observer('arrays.[]', function() {
      this._recomputeArrayKeys();

      let arrays = get(this, 'arrays');
      let arrayKeys = get(this, 'arrayKeys');

      if (isEmpty(arrays)) {
        defineProperty(this, 'content', []);
        return;
      }

      defineProperty(this, 'content', multiArrayComputed(...arrayKeys));
    }),

    contentDidChange: observer('content.[]', function() {
      this.recompute();
    }),

    _recomputeArrayKeys() {
      let arrays = get(this, 'arrays');

      let oldArrayKeys = get(this, 'arrayKeys') || [];
      let newArrayKeys = arrays.map(idForArray);

      let keysToRemove = oldArrayKeys.filter((key) => {
        return newArrayKeys.indexOf(key) === -1;
      });

      keysToRemove.forEach((key) => set(this, key, null));
      arrays.forEach((array) => set(this, idForArray(array), array));

      set(this, 'arrayKeys', newArrayKeys);
    }
  });
}
