import Ember from 'ember';

const {
  Helper: { helper },
  typeOf
} = Ember;

export function flatten(array) {
  array = array || [];

  return array.reduce((flat, toFlatten) => {
    return flat.concat(typeOf(toFlatten) === 'array' ? flatten(toFlatten) : toFlatten);
  }, []);
}

export default helper(flatten);
