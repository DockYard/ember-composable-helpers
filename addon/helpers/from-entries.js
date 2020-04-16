import { helper } from '@ember/component/helper';

export default helper(function fromEntries([entries]) {
  if (!entries) {
    return entries;
  }
  return Object.fromEntries(entries);
});
