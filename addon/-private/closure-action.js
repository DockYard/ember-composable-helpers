import Ember from 'ember';

const { __loader } = Ember;

let ClosureActionModule;

if ('ember-htmlbars/keywords/closure-action' in __loader.registry) {
  ClosureActionModule = __loader.require('ember-htmlbars/keywords/closure-action');
} else {
  ClosureActionModule = __loader.require('ember-routing-htmlbars/keywords/closure-action');
}

export default ClosureActionModule.ACTION;
