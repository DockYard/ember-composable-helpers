import Ember from 'ember';
import { isEmberArray } from 'ember-array/utils';
import { sort } from 'ember-computed';
import Helper from 'ember-helper';
import get from 'ember-metal/get';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { isEmpty, typeOf } from 'ember-utils';

const { defineProperty } = Ember;

export default Helper.extend({
  compute(params) {
    // slice params to avoid mutating the provided params
    let sortProps = params.slice();
    let array = sortProps.pop();
    let [firstSortProp] = sortProps;

    if (typeOf(firstSortProp) === 'function' || isEmberArray(firstSortProp)) {
      sortProps = firstSortProp;
    }

    set(this, 'array', array);
    set(this, 'sortProps', sortProps);

    return get(this, 'content');
  },

  sortPropsDidChange: observer('sortProps', function() {
    let sortProps = get(this, 'sortProps');

    if (isEmpty(sortProps)) {
      defineProperty(this, 'content', []);
    }

    if (typeof sortProps === 'function') {
      defineProperty(this, 'content', sort('array', sortProps));
    } else {
      defineProperty(this, 'content', sort('array', 'sortProps'));
    }
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
