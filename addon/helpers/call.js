import Helper from '@ember/component/helper';

/**
 * Calls a function passed within a template and returns its value.
 * In order to pass arguments to the function being called, you must
 * curry the function using the `fn` helper.
 *
 ```example
    <div data-metrics={{call (fn this.myMetrics (hash item=@item))}}
  ```
 *
 * @function apply
 * @param {Array<Function>} fn - The function to be called
 * @param {*=} thisArg - An optional `this` context
 */
export function call([fn, thisArg]) {
    if (fn) {
        if (thisArg) {
            return fn.apply(thisArg);
        } else {
            return fn();
        }
    }
}

export default Helper.helper(call);

