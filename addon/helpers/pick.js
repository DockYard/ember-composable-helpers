import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export default helper(function event([path, action]/*, hash*/) {
  return function(event) {
    let value = get(event, path);

    if (!action) {
      return value;
    }

    action(value);
  };
});
