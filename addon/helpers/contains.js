import { A as emberArray } from '@ember/array';
import { isArray as isEmberArray } from '@ember/array';
import { helper } from '@ember/component/helper';

function _contains(needle, haystack) {
  return emberArray(haystack).includes(needle);
}

export function contains(needle, haystack) {
  if (!isEmberArray(haystack)) {
    return false;
  }

  if (isEmberArray(needle)) {
    return needle.reduce((acc, val) => acc && _contains(val, haystack), true);
  }

  return _contains(needle, haystack);
}

export default helper(function([needle, haystack]) {
  return contains(needle, haystack);
});
