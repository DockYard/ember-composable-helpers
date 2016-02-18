import Ember from 'ember';

const { Controller, set } = Ember;

export default Controller.extend({
  value: 0,

  actions: {
    add(x, y) {
      return x + y;
    },

    square(x) {
      return x * x;
    },

    squareRoot(x) {
      return set(this, 'value', Math.sqrt(x));
    }
  }
});
