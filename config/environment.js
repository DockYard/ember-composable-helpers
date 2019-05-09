'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    EmberENV: {
      FEATURES: {
        EMBER_NATIVE_DECORATOR_SUPPORT: true,
        EMBER_METAL_TRACKED_PROPERTIES: true
      }
    }
  };
};
