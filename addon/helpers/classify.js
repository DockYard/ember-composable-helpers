import { helper } from 'ember-helper';
import { classify as _classify } from 'ember-string';
import createStringHelperFunction from '../-private/create-string-helper';

export const classify = createStringHelperFunction(_classify);
export default helper(classify);
