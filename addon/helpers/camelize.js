import { helper } from 'ember-helper';
import { camelize as _camelize } from 'ember-string';
import createStringHelperFunction from '../-private/create-string-helper';

export const camelize = createStringHelperFunction(_camelize);
export default helper(camelize);
