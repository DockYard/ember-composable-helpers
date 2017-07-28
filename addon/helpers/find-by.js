import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { A as emberArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

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

    defineProperty(this, 'content', computed(`array.@each.${byPath}`, 'value', function() {
      let array = get(this, 'array');
      let value = get(this, 'value');

      return emberArray(array).findBy(byPath, value);
    }));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
