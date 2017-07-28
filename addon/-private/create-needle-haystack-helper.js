import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import Helper from '@ember/component/helper';
import { get } from '@ember/object';
import { observer } from '@ember/object';
import { set } from '@ember/object';

const K = () => { };

/**
 * Creates a generic Helper class implementation that expects a `needle` and
 * `haystack` as arguments. A `fn` function is required to be passed in
 * that is invoked with the `needle` and `haystack` arguments.
 *
 * @private
 * @param  {Function} fn A function to run against the needle and haystack
 * @return {Any}
 */
export default function createNeedleHaystackHelper(fn = K) {
  return Helper.extend({
    content: computed('needle.[]', 'haystack.[]', 'option', function() {
      let needle = get(this, 'needle');
      let haystack = get(this, 'haystack');
      let option = get(this, 'option');

      return fn(needle, haystack, option);
    }).readOnly(),

    compute([needle, option, haystack]) {
      if (isEmpty(haystack)) {
        haystack = option;
        option = null;
      }

      set(this, 'needle', needle);
      set(this, 'haystack', haystack);
      set(this, 'option', option);

      return get(this, 'content');
    },

    contentDidChange: observer('content', function() {
      this.recompute();
    })
  });
}
