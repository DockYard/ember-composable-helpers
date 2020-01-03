import { helper } from '@ember/component/helper';

export function take([takeAmount, array]) {
  if (!array) {
    array = [];
  }

  return array.slice(0, takeAmount);
}

export default helper(take);
