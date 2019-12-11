import { helper } from '@ember/component/helper';

export function drop([dropAmount, array]) {
  if (!array) {
    array = [];
  }
  return array.slice(dropAmount);
}

export default helper(drop);
