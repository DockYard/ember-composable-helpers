import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';
import { isEmpty, isPresent } from '@ember/utils';
import { get } from '@ember/object';
import isEqual from '../utils/is-equal';
import asArray from '../utils/as-array';

export function filterBy([byPath, value, array]) {

  if (!isEmberArray(array) && isEmberArray(value)) {
    array = value;
    value = undefined;
  }

  array = asArray(array);

  if (isEmpty(byPath) || isEmpty(array)) {
    return [];
  }

  let filterFn;

  if (isPresent(value)) {
    if (typeof value === 'function') {
      filterFn = (item) => value(get(item, byPath));
    } else {
      filterFn = (item) => isEqual(get(item, byPath), value);
    }
  } else {
    filterFn = (item) => !!get(item, byPath);
  }

  return array.filter(filterFn);
}

export default helper(filterBy);
