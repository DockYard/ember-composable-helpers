import { helper } from '@ember/component/helper';

function take([takeAmount, array]) {
  if (!array) {
    array = [];
  }

  return array.slice(0, takeAmount);
}

export default helper(take);
