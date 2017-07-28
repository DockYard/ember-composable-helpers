import { helper } from '@ember/component/helper';
import { toggle } from './toggle';
import ACTION from '../-private/closure-action';

const closureToggle = toggle;
if (ACTION) {
  closureToggle[ACTION] = true;
}

export default helper(closureToggle);
