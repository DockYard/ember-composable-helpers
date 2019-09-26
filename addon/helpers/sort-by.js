import { defineProperty } from '@ember/object';
import { isArray as isEmberArray } from '@ember/array';
import { sort } from '@ember/object/computed';
import Helper from '@ember/component/helper';
import { set } from '@ember/object';
import { isEmpty, typeOf } from '@ember/utils';

export default Helper.extend({
  compute(params) {
    // slice params to avoid mutating the provided params
    let sortProps = params.slice();
    let array = sortProps.pop();
    let [firstSortProp] = sortProps;

    if (typeOf(firstSortProp) === 'function' || isEmberArray(firstSortProp)) {
      sortProps = firstSortProp;
    }

    // TODO: can we / should we use variables instead of computed properties?
    set(this, 'array', array);
    set(this, 'sortProps', sortProps);

    if (isEmpty(sortProps)) {
      defineProperty(this, 'content', []);
    }

    if (typeof sortProps === 'function') {
      defineProperty(this, 'content', sort('array', sortProps));
    } else {
      defineProperty(this, 'content', sort('array', 'sortProps'));
    }

    return this.content;
  },
});
