import { helper } from '@ember/component/helper';
import { isArray as isEmberArray } from '@ember/array';

export function without(needle, haystack) {
  if (!isEmberArray(haystack)) {
    return false;
  }

  if (isEmberArray(needle) && needle.length) {
    return haystack.reduce((acc, val) => {
      return needle.includes(val) ? acc : acc.concat(val);
    }, []);
  }

  return haystack.filter(val => val !== needle);
}

export default helper(function([needle, haystack]) {
  return without(needle, haystack);
});