import { helper } from 'ember-helper';
import titleizeLib from 'ember-composable-helpers/utils/titleize';
import createStringHelperFunction from '../-private/create-string-helper';

export const titleize = createStringHelperFunction(titleizeLib);
export default helper(titleize);
