import isEqual from '../utils/is-equal';

export default function getIndex(array, currentValue, useDeepEqual) {
  let index;
  if (useDeepEqual) {
    index = array.findIndex((object) => {
      return isEqual(object, currentValue, useDeepEqual);
    });
  } else {
    index = array.indexOf(currentValue);
  }

  return index >= 0 ? index : null;
}
