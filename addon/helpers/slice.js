import Helper from 'ember-helper';
import observer from 'ember-metal/observer';
import set from 'ember-metal/set';

export default Helper.extend({
  compute(args) {
    let array = args[args.length - 1];
    let parsedArgs = [];

    if (args.length === 3) {
      parsedArgs = [ args[0], args[1] ];
    }

    if (args.length === 2) {
      parsedArgs = [ args[0] ];
    }

    set(this, 'array', array);
    return array.slice(...parsedArgs);
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
