import { helper } from '@ember/component/helper';
import { typeOf } from '@ember/utils';
import { gte, lte, gt, lt } from '../utils/comparison';

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

  if (min === max && isInclusive) {
    numbers.push(max);
  }

  return numbers;
}

export default helper(range);
