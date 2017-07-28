import Helper from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import { observer } from '@ember/object';
import { set } from '@ember/object';

export function flatten(array) {
  if (!isEmberArray(array)) {
    return array;
  }

  return array.reduce((flattened, el) => {
    return flattened.concat(flatten(el));
  }, []);
}

export default Helper.extend({
  compute([array]) {
    set(this, 'array', array);

    return flatten(array);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
