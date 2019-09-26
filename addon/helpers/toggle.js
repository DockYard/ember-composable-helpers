import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { isPresent } from '@ember/utils';

function nextIndex(length, currentIdx) {
  if (currentIdx === -1 || currentIdx + 1 === length) {
    return 0;
  }

  return currentIdx + 1;
}

export function toggle([prop, obj, ...values]) {
  return function() {
    let currentValue = get(obj, prop);

    if (isPresent(values)) {
      let currentIdx = values.indexOf(currentValue);
      let nextIdx = nextIndex(values.length, currentIdx);

      return set(obj, prop, values[nextIdx]);
    }

    return set(obj, prop, !currentValue);
  };
}

export default helper(toggle);
