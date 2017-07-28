import { defineProperty } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Helper.extend({
  compute([byPath, array]) {
    set(this, 'array', array);
    set(this, 'byPath', byPath);

    return get(this, 'content');
  },

  byPathDidChange: observer('byPath', function() {
    let byPath = get(this, 'byPath');

    if (isEmpty(byPath)) {
      defineProperty(this, 'content', []);
      return;
    }

    defineProperty(this, 'content', mapBy('array', byPath));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
