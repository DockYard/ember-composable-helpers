import { helper } from '@ember/component/helper';

export function union([...arrays]) {
  let items = [].concat(...arrays);

  return items.filter((value, index, array) => array.indexOf(value) === index);
}

export default helper(union);
