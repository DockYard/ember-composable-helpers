import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';

export function flatten(array) {
  if (!isEmberArray(array)) {
    return array;
  }

  return array.reduce((flattened, el) => {
    return flattened.concat(flatten(el));
  }, []);
}

export default helper(function([array]) {
  return flatten(array);
});
