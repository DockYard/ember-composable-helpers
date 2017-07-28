import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function dec([step, val]) {
  if (isEmpty(val)) {
    val = step;
    step = undefined;
  }

  val = Number(val);

  if (isNaN(val)) {
    return;
  }

  if (step === undefined) {
    step = 1;
  }

  return val - step;
}

export default helper(dec);
