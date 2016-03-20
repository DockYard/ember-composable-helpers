import { helper } from 'ember-helper';
import { capitalize as _capitalize } from 'ember-string';
import createStringHelperFunction from '../-private/create-string-helper';

export const capitalize = createStringHelperFunction(_capitalize);
export default helper(capitalize);
