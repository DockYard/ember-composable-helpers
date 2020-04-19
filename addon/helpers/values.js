import { helper } from '@ember/component/helper';

export default helper(function values([object]) {
  if (!object) {
    return object;
  }
  return Object.values(object);
});
