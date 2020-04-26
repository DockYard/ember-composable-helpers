import { get } from '@ember/object';
// import { isArray as isEmberArray } from '@ember/array';
import { helper } from '@ember/component/helper';

function normalizeToBoolean(val) {
  if (typeof val === 'boolean') {
    return val;
  }

  if (typeof val === 'number') {
    return val > 0 ? false : true;
  }

  return val;
}

function sortDesc(key, a, b) {
  return get(a, key) > get(b, key);
}

function sortAsc(key, a, b) {
  return get(a, key) < get(b, key);
}

class SortBy {
  constructor(...args) {
    let [array] = args;

    this.array = [...array];
    this.callbacks = null;
    this.keys = [];
  }

  comparator(key) {
    return this.callback ? this.callback : this.defaultSort(key);
  }

  defaultSort(sortKey) {
    let func = sortAsc;
    if (sortKey.match(':desc')) {
      func = sortDesc;
    }

    return (a, b) => func(sortKey.replace(/:desc|:asc/, ''), a, b);
  }

  addCallback(callback) {
    this.callback = callback;
  }

  addKeys(...keys) {
    this.keys.push(...keys);
  }
}

/**
 * best O(n); worst O(n^2)
 * If we feel like swapping with something more performant like QuickSort or MergeSort
 * then it should be easy
 *
 * @class BubbleSort
 * @extends SortBy
 */
class BubbleSort extends SortBy {
  perform(key) {
    let swapped = false;

    let compFunc = this.comparator(key);
    for (let i = 1; i < this.array.length; i += 1) {
      for (let j = 0; j < this.array.length - i; j += 1) {
        let shouldSwap = normalizeToBoolean(compFunc(this.array[j+1], this.array[j]));
        if (shouldSwap) {
          [this.array[j], this.array[j+1]] = [this.array[j+1], this.array[j]];

          swapped = true;
        }
      }

      // no need to continue sort if not swapped in any inner iteration
      if (!swapped) {
        return this.array;
      }
    }
  }
}

export function sortBy(params) {
  // slice params to avoid mutating the provided params
  let sortParams = params.slice();
  let array = sortParams.pop();
  let sortKeys = sortParams;

  if (!array || (!sortKeys || sortKeys.length === 0)) {
    return [];
  }

  if (sortKeys.length === 1 && Array.isArray(sortKeys[0])) {
    sortKeys = sortKeys[0];
  }

  const sortKlass = new BubbleSort(array);

  if (typeof sortKeys[0] === 'function') { // || isEmberArray(firstSortProp)) {
    sortKlass.addCallback(sortKeys[0]);
    sortKlass.perform();
  } else {
    sortKlass.addKeys(...sortKeys);

    for (let key of sortKlass.keys) {
      sortKlass.perform(key);
    }
  }


  return sortKlass.array;
}

export default helper(sortBy);
