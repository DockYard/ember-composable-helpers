import Ember from 'ember';
import { observer } from '@ember/object';
import { FEATURES } from '@ember/canary-features';
// import { EMBER_METAL_TRACKED_PROPERTIES } from '@ember/canary-features';

const { EMBER_METAL_TRACKED_PROPERTIES = false } = FEATURES;
const setClassicDecorator =
  Ember._setClassicDecorator || Ember._setComputedDecorator;

export default (!EMBER_METAL_TRACKED_PROPERTIES
  ? observer
  : function syncObserver(...args) {
      const dependentKeys = args.slice(0, -1);
      const [callback] = args.slice(-1);

      function decorator(obj) {
        const values = Object.create(null);
        for (const dependentKey of dependentKeys) {
          Object.defineProperty(obj, dependentKey, {
            enumerable: true,
            configurable: true,
            get() {
              return values[dependentKey];
            },
            set(value) {
              values[dependentKey] = value;
              callback.call(obj);
            }
          });
        }

        return { value: callback, enumerable: false, writable: false };
      }

      setClassicDecorator(decorator);

      return decorator;
    });
