import { helper } from '@ember/component/helper';

function slice([start, end, array]) {
  return array.slice(start, end);
}

export default helper(slice);
