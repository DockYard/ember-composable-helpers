import { typeOf } from '@ember/utils';

export default function isObject(val) {
  return typeOf(val) === 'object' || typeOf(val) === 'instance';
}
