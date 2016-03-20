import { helper } from 'ember-helper';
import { w as toWords } from 'ember-string';

export function w([...wordStrings]) {
  return wordStrings
    .map(toWords)
    .reduce((words, moreWords) => words.concat(moreWords));
}

export default helper(w);
