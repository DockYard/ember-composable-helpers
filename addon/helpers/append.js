import { helper } from '@ember/component/helper';

export function append([...arrays]) {
  return [].concat(...arrays);
}

export default helper(append);
