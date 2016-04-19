import { helper } from 'ember-helper';

export function truncate([string, characterLimit = 140]) {
  let limit = characterLimit - 3;

  if (string && string.length > limit) {
    return `${string.substring(0, limit)}...`;
  } else {
    return string;
  }
}

export default helper(truncate);
