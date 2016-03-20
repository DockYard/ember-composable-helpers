import { helper } from 'ember-helper';
import { dasherize as _dasherize } from 'ember-string';

export function dasherize([string]) {
  string = string || '';
  return _dasherize(string);
}

export default helper(dasherize);
