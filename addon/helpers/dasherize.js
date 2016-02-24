import Ember from 'ember';
const {
  Helper: { helper },
  String: { dasherize: _dasherize }
} = Ember;

export function dasherize([string]) {
  string = string || '';
  return _dasherize(string);
}

export default helper(dasherize);
