import Ember from 'ember';
const { isEqual: emberIsEqual } = Ember;

export default function isEqual(firstValue, secondValue, useDeepEqual = false) {
  if (useDeepEqual) {
    return JSON.stringify(firstValue) === JSON.stringify(secondValue);
  } else {
    return emberIsEqual(firstValue, secondValue) || emberIsEqual(secondValue, firstValue);
  }
}
