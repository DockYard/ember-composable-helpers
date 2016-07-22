import { helper } from 'ember-helper';
import titleizeLib from 'ember-composable-helpers/utils/titleize';

export function titleize([str = '']) {
  return titleizeLib(str);
}

export default helper(titleize);
