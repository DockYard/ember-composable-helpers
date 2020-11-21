import { isArray } from '@ember/array';

export default function asArray(maybeArray) {
  if (typeof maybeArray === 'number') {
    throw new Error('Numbers not supported as arrays [ember-composable-helpers]');
  }
  // for perf-reasons falling back to e-array, instead of using it first
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  } else if (isArray(maybeArray)) {
    return maybeArray;
  } else if (typeof maybeArray === 'object' && maybeArray === null) {
    return [];
  } else if (typeof maybeArray === 'undefined') {
    return [];
  } else if (maybeArray instanceof Set) {
    return Array.from(maybeArray.values());
  } else if (maybeArray instanceof Map) {
    return Array.from(maybeArray.values());
  } if (typeof maybeArray === 'object') {
    return Array.from(Object.values(maybeArray));
  }
  if (!maybeArray) {
    return [];
  }
  return maybeArray;
}
