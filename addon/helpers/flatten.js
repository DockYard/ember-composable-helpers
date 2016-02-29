import Ember from 'ember';

const {
  Helper: { helper }
} = Ember;

export function flatten(array) {
  array = array || [];

  return array.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export default helper(flatten);
