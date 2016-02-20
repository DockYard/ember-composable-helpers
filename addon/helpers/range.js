import Ember from 'ember';
import { gte, lte, lt } from '../utils/comparison';

const {
  Helper: { helper },
  typeOf
} = Ember;

export function range([min, max, isInclusive]) {
  isInclusive = typeOf(isInclusive) === 'boolean' ? isInclusive : false;
  let testFn = isInclusive ? lte : lt;
  let numbers = [];

  if (min < max) {
    for (let i = min; testFn(i, max); i++) {
      numbers.push(i);
    }
  }

  if (min > max) {
    testFn = gte;
    for (let i = max; testFn(min, i); i++) {
      numbers.push(i);
    }

    if (!isInclusive) {
      numbers.reverse().pop();
      return numbers;
    }

    return numbers.reverse();
  }

  return numbers;
}

export default helper(range);
