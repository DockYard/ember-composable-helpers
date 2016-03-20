import { helper } from 'ember-helper';
import { dasherize as _dasherize } from 'ember-string';
import createStringHelperFunction from '../-private/create-string-helper';

export const dasherize = createStringHelperFunction(_dasherize);
export default helper(dasherize);
