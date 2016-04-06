import {
  A as emberArray,
  isEmberArray as isArray
} from 'ember-array/utils';
import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';
import { typeOf } from 'ember-utils';

export function shuffle(array, randomizer) {
  array = array.slice(0);
  let count = array.length;
  let rand, temp;
  randomizer = (typeOf(randomizer) === 'function' && randomizer) || Math.random;

  while (count > 1) {
    rand = Math.floor(randomizer() * (count--));

    temp = array[count];
    array[count] = array[rand];
    array[rand] = temp;
  }
  return array;
}

export default Helper.extend({
  compute([array, random]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);
    return shuffle(array, random);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
