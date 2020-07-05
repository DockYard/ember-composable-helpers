import { get } from '@ember/object';
import { helper } from '@ember/component/helper';

function normalizeToBoolean(val) {
  if (typeof val === 'boolean') {
    return val;
  }

  if (typeof val === 'number') {
    if (val > 0) {
      return false;
    } else if (val < 0) {
      return true;
    }
  }

  return val;
}

function sortDesc(key, a, b) {
  const aValue = get(a, key);
  const bValue = get(b, key);

  if (typeof bValue == 'undefined' || bValue === null) {
    // keep bValue last
    return -1;
  }
  if (typeof aValue == 'undefined' || aValue === null) {
    // put aValue last
    return 1;
  }

  if (aValue.toLowerCase && bValue.toLowerCase) {
    return bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
  }

  if (aValue < bValue) {
    return 1
  } else if (aValue > bValue) {
    return -1;
  }

  return 0;
}

function sortAsc(key, a, b) {
  const aValue = get(a, key);
  const bValue = get(b, key);

  if (typeof bValue == 'undefined' || bValue === null) {
    // keep bValue last
    return -1;
  }
  if (typeof aValue == 'undefined' || aValue === null) {
    // put aValue last
    return 1;
  }

  if (aValue.toLowerCase && bValue.toLowerCase) {
    return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
  }

  if (aValue < bValue) {
    return -1
  } else if (aValue > bValue) {
    return 1;
  }

  return 0;
}

class SortBy {
  constructor(...args) {
    let [array] = args;
    if (typeof array.toArray === "function") {
      array = array.toArray();
    }

    this.array = [...array];
  }

  comparator(key) {
    return (typeof key === 'function') ? key : this.defaultSort(key);
  }

  defaultSort(sortKey) {
    let func = sortAsc;
    if (sortKey.match(':desc')) {
      func = sortDesc;
    }

    return (a, b) => func(sortKey.replace(/:desc|:asc/, ''), a, b);
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
  perform(keys = []) {
    let swapped = false;

    let compFuncs = keys.map(key => this.comparator(key));
    let compFunc = (a, b) => {
      for (let i = 0; i < compFuncs.length; i += 1) {
        let result = compFuncs[i](a,b);
        if (result === 0) {
          continue;
        }
        return result;
      }
      return 0;
    };
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
  sortKlass.perform(sortKeys);
  return sortKlass.array;
}

export default helper(sortBy);
