import { helper } from 'ember-helper';
import { camelize as _camelize } from 'ember-string';

export function camelize([string]) {
  string = string || '';
  return _camelize(string);
}

export default helper(camelize);
