import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export function mapBy([byPath, array]) {
  if (isEmpty(byPath)) {
    return [];
  }
  if (!array) {
    array = [];
  }

  return array.map(item => get(item, byPath));
}

export default helper(mapBy);
