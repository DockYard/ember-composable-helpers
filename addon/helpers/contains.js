import { helper } from '@ember/component/helper';
import { includes } from './includes';
import { deprecate } from '@ember/debug';

export function contains(needleOrNeedles, haystack) {
  deprecate(
    '{{contains}} helper provided by ember-composable-helpers has been renamed to {{includes}}.',
    false,
    {
      id: 'ember-composable-helpers.contains-helper',
      until: '5.0.0'
    }
  );

  return includes(needleOrNeedles, haystack);
}

export default helper(function([needle, haystack]) {
  return contains(needle, haystack);
});
