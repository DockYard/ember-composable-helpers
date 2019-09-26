import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

function mapBy([byPath, array]) {
  if (isEmpty(byPath)) {
    return [];
  }

  return array.map(item => item[byPath]);
}

export default helper(mapBy);
