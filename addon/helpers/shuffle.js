import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import { typeOf } from '@ember/utils';

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

export default helper(function([randomizer, array]) {
  if (array === undefined) {
    array = randomizer;
    randomizer = undefined;
  }

  if (!isEmberArray(array)) {
    return [array];
  }

  return shuffle(array, randomizer)
});
