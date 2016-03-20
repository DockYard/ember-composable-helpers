import Ember from 'ember';
import computed from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

const { K } = Ember;

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
    content: computed('needle.[]', 'haystack.[]', function() {
      let needle = get(this, 'needle');
      let haystack = get(this, 'haystack');

      return fn(needle, haystack);
    }).readOnly(),

    compute([needle, haystack]) {
      set(this, 'needle', needle);
      set(this, 'haystack', haystack);

      return get(this, 'content');
    },

    contentDidChange: observer('content', function() {
      this.recompute();
    })
  });
}
