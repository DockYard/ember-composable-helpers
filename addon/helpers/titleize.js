import { helper } from 'ember-helper';
import titleizeLib from 'ember-composable-helpers/utils/titleize';

export function titleize(params/*, hash*/) {
  return titleizeLib(params[0] || '');
}

export default helper(titleize);
