export default function isEqual(firstValue, secondValue, useDeepEqual = false) {
  if (useDeepEqual) {
    return JSON.stringify(firstValue) === JSON.stringify(secondValue);
  } else {
    return firstValue === secondValue;
  }
}
