import Ember from 'ember';

let ClosureActionModule;

if ('ember-htmlbars/keywords/closure-action' in Ember.__loader.registry) {
  ClosureActionModule = Ember.__loader.require('ember-htmlbars/keywords/closure-action');
} else {
  ClosureActionModule = Ember.__loader.require('ember-routing-htmlbars/keywords/closure-action');
}

export default ClosureActionModule.ACTION;
