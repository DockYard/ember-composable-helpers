import Ember from 'ember';
const {
  Helper: { helper },
  String: { camelize: _camelize }
} = Ember;

export function camelize([string]) {
  string = string || '';
  return _camelize(string);
}

export default helper(camelize);
