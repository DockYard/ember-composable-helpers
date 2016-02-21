import Ember from 'ember';

const {
  Helper: { helper },
  String: { w: toWords }
} = Ember;

export function w([...wordStrings]) {
  return wordStrings
    .map(toWords)
    .reduce((words, moreWords) => words.concat(moreWords));
}

export default helper(w);
