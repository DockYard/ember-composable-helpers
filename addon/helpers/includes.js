import { A as emberArray } from '@ember/array';
import { isArray as isEmberArray } from '@ember/array';
import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function includes(needleOrNeedles, haystack) {
  if (!isEmberArray(haystack)) {
    return false;
  }

  let needles = isEmberArray(needleOrNeedles) ? needleOrNeedles : [needleOrNeedles];
  let haystackAsEmberArray = emberArray(asArray(haystack));

  return asArray(needles).every((needle) => {
    return haystackAsEmberArray.includes(needle);
  });
}

export default helper(function([needle, haystack]) {
  return includes(needle, haystack);
});
