import { typeOf } from '@ember/utils';
import isObject from './is-object';

function isPromiseLike(obj = {}) {
  return typeOf(obj.then) === 'function' && typeOf(obj.catch) === 'function';
}

export default function isPromise(obj) {
  return isObject(obj) && isPromiseLike(obj);
}
