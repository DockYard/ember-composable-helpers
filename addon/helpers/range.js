import Ember from 'ember';
import { gte, lte, gt, lt } from '../utils/comparison';

const {
  Helper: { helper },
  typeOf
} = Ember;

export function range([min, max, isInclusive]) {
  isInclusive = typeOf(isInclusive) === 'boolean' ? isInclusive : false;
  let numbers = [];

  if (min < max) {
    let testFn = isInclusive ? lte : lt;
    for (let i = min; testFn(i, max); i++) {
      numbers.push(i);
    }
  }

  if (min > max) {
    let testFn = isInclusive ? gte : gt;
    for (let i = min; testFn(i, max); i--) {
      numbers.push(i);
    }
  }

  return numbers;
}

export default helper(range);
