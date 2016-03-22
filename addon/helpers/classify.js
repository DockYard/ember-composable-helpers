import { helper } from 'ember-helper';
import { classify as _classify } from 'ember-string';

export function classify([string]) {
  string = string || '';
  return _classify(string);
}

export default helper(classify);
