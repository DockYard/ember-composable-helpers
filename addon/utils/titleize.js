import Ember from 'ember';

export default function titleize(string = '') {
  if (Ember.isBlank(string)) {
    return '';
  }
  
  if (typeof string !== 'string') {
    throw new TypeError(`Expected a string, got a ${typeof string}`);
  }

  return string.toLowerCase().replace(/(?:^|\s|-|\/)\S/g, function(m) {
    return m.toUpperCase();
  });
}
