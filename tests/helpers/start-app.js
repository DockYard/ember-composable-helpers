import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

const {
  assign: emberAssign,
  merge: emberMerge,
  run
} = Ember;

const assign = emberAssign || emberMerge;

export default function startApp(attrs) {
  let attributes = assign({}, config.APP);
  attributes = assign(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
