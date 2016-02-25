import Ember from 'ember';
const {
  Helper: { helper },
  String: { capitalize: _capitalize }
} = Ember;

export function capitalize([string]) {
  string = string || '';
  return _capitalize(string);
}

export default helper(capitalize);
