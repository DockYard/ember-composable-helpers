import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function groupBy([byPath, array]) {
  let groups = {};

  array.forEach((item) => {
    let groupName = get(item, byPath);
    let group = groups[groupName];

    if (!Array.isArray(group)) {
      group = [];
      groups[groupName] = group;
    }

    group.push(item);
  });

  return groups;
}

export default helper(groupBy);
