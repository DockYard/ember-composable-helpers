import { helper } from '@ember/component/helper';

export function fromEntries([entries]) {
  if (!entries) {
    return entries;
  }
  return Object.fromEntries(entries);
}

export default helper(fromEntries);
