import Ember from 'ember';
const {
  Helper: { helper },
  String: { classify: _classify }
} = Ember;

export function classify([string]) {
  string = string || '';
  return _classify(string);
}

export default helper(classify);
