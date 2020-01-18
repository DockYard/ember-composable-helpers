import { helper } from '@ember/component/helper';

export function slice([...args]) {
  let array = args.pop();

  if (!array) {
    array = [];
  }
  return array.slice(...args);
}

export default helper(slice);
