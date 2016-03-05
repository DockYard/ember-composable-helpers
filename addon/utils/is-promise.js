import Ember from 'ember';

const { RSVP: { Promise }, isPresent } = Ember;

export default function isPromise(obj) {
  return isPresent(obj) && obj instanceof Promise;
}
