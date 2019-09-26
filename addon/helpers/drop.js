import { helper } from '@ember/component/helper';

function drop([dropAmount, array]) {
  return array.slice(dropAmount);
}

export default helper(drop);
