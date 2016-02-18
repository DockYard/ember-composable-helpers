import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function compose([f, g]) {
  return function(...args) {
    return f(g(...args));
  };
}

export default helper(compose);
