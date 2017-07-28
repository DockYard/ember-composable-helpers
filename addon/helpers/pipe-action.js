import { helper } from '@ember/component/helper';
import { pipe } from './pipe';
import ACTION from '../-private/closure-action';

const closurePipe = pipe;
if (ACTION) {
  closurePipe[ACTION] = true;
}

export default helper(closurePipe);
