import Ember from 'ember';
const {
  Helper: { helper },
  String: { underscore: _underscore }
} = Ember;

export function underscore([string]) {
  string = string || '';
  return _underscore(string);
}

export default helper(underscore);
