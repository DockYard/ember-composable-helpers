import Ember from 'ember';
import isObject from './is-object';

const { typeOf } = Ember;

function isPromiseLike(obj = {}) {
  return typeOf(obj.then) === 'function' &&
    typeOf(obj.catch) === 'function' &&
    typeOf(obj.finally) === 'function';
}

export default function isPromise(obj) {
  return isObject(obj) && isPromiseLike(obj);
}
