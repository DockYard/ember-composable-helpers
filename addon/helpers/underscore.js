import { helper } from 'ember-helper';
import { underscore as _underscore } from 'ember-string';

export function underscore([string]) {
  string = string || '';
  return _underscore(string);
}

export default helper(underscore);
