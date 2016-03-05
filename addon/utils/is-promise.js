import Ember from 'ember';

const { typeOf } = Ember;

function isPromiseLike(obj = {}) {
  return typeOf(obj.then) === 'function' &&
    typeOf(obj.catch) === 'function' &&
    typeOf(obj.finally) === 'function';
}

export default function isPromise(obj) {
  return typeOf(obj) === 'object' && isPromiseLike(obj);
}
