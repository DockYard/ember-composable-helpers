import { helper } from 'ember-helper';

export function truncate([string, characterLimit = 140]) {
  if (string) {
    if (string.length > characterLimit) {
      return `${string.substring(0, characterLimit)}...`;
    } else {
      return string;
    }
  }
}

export default helper(truncate);
