import { helper } from 'ember-helper';
import { underscore as _underscore } from 'ember-string';
import createStringHelperFunction from '../-private/create-string-helper';

export const underscore = createStringHelperFunction(_underscore);
export default helper(underscore);
