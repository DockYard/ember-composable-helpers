// Array.at isn't universally supported yet https://caniuse.com/?search=Array.at
// from https://github.com/tc39/proposal-relative-indexing-method#polyfill
export default function arrayAt(array, n) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;
  // Allow negative indexing from the end
  if (n < 0) n += array.length;
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= array.length) return undefined;
  // Otherwise, this is just normal property access
  return array[n];
}
