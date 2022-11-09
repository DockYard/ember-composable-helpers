import { HelperLike } from '@glint/template';

type AnyFunction = (...args: never[]) => unknown;
type AnyObject = Record<unknown, unknown>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    // Action helpers
    pipe: HelperLike<{
      Args: { Positional: [AnyFunction[]] };
      Return: AnyFunction;
    }>;
    'pipe-action': HelperLike<{
      Args: { Positional: [AnyFunction[]] };
      Return: AnyFunction;
    }>;
    call: HelperLike<{
      Args: { Positional: [func: AnyFunction] };
      Return: void;
    }>;
    compute: HelperLike<{
      Args: { Positional: [func: AnyFunction, args: unknown[]] };
      Return: unknown;
    }>;
    toggle: HelperLike<{
      Args: { Positional: [fieldName: string, obj: AnyObject] };
      Return: void;
    }>;
    'toggle-action': HelperLike<{
      Args: { Positional: [fieldName: string, obj: AnyObject] };
      Return: AnyFunction;
    }>;
    noop: HelperLike<{
      Args: { Positional: [] };
      Return: AnyFunction;
    }>;
    optional: HelperLike<{
      Args: { Positional: [func?: AnyFunction] };
      Return: AnyFunction;
    }>;
    queue: HelperLike<{
      Args: { Positional: [AnyFunction[]] };
      Return: AnyFunction;
    }>;
    // Array helpers
    map: HelperLike<{
      Args: { Positional: [callback: AnyFunction, array: unknown[]] };
      Return: unknown;
    }>;
    'map-by': HelperLike<{
      Args: { Positional: [byPath: string, array: unknown[]] };
      Return: unknown;
    }>;
    'sort-by': HelperLike<{
      Args: { Positional: [sortParams: string[] | AnyFunction, array: unknown[]] };
      Return: unknown[];
    }>;
    filter: HelperLike<{
      Args: { Positional: [func: AnyFunction, array: unknown[]] };
      Return: unknown[];
    }>;
    'filter-by': HelperLike<{
      Args: { Positional: [fieldName: string, fieldValue: unknown | AnyFunction, array?: unknown[]] };
      Return: unknown[];
    }>;
    'reject-by': HelperLike<{
      Args: { Positional: [fieldName: string, fieldValue: unknown | AnyFunction, array?: unknown[]] };
      Return: unknown[];
    }>;
    'find-by': HelperLike<{
      Args: { Positional: [fieldName: string, fieldValue: unknown, array: unknown[]] };
      Return: unknown | undefined;
    }>;
    intersect: HelperLike<{
      Args: { Positional: [array1: Array<unknown>, array2: unknown[]] };
      Return: Array<unknown> | undefined;
    }>;
    invoke: HelperLike<{
      Args: { Positional: [methodName: string, obj: AnyObject | AnyObject[]] };
      Return: AnyFunction;
    }>;
    union: HelperLike<{
      Args: { Positional: [arrays: Array<Array<unknown>>] };
      Return: Array<unknown>;
    }>;
    take: HelperLike<{
      Args: { Positional: [takeAmount: number, array: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    drop: HelperLike<{
      Args: { Positional: [dropAmount: number, array: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    reduce: HelperLike<{
      Args: { Positional: [callback: AnyFunction, initialValue: unknown, array?: unknown[]] };
      Return: unknown | undefined;
    }>;
    repeat: HelperLike<{
      Args: { Positional: [length: number, value?: unknown] };
      Return: unknown[];
    }>;
    reverse: HelperLike<{
      Args: { Positional: [array: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    range: HelperLike<{
      Args: { Positional: [min: number, max: number, inclusive?: boolean] };
      Return: number[];
    }>;
    join: HelperLike<{
      Args: { Positional: [separator: string, rawArray: unknown | Array<unknown>] };
      Return: string;
    }>;
    compact: HelperLike<{
      Args: { Positional: [rawArray: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    includes: HelperLike<{
      Args: { Positional: [needleOrNeedles: unknown | Array<unknown>, haystack: Array<unknown>] };
      Return: boolean;
    }>;
    append: HelperLike<{
      Args: { Positional: [arrays: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    chunk: HelperLike<{
      Args: { Positional: [num: number, array: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    without: HelperLike<{
      Args: { Positional: [needleOrNeedles: unknown | Array<unknown>, haystack: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    shuffle: HelperLike<{
      Args: { Positional: [randomizer: AnyFunction | Array<unknown>, array?: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    flatten: HelperLike<{
      Args: { Positional: [array: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    'object-at': HelperLike<{
      Args: { Positional: [index: number, array: Array<unknown>] };
      Return: unknown;
    }>;
    slice: HelperLike<{
      Args: { Positional: [start: number | Array<unknown>, end?: number, array?: Array<unknown>] };
      Return: Array<unknown>;
    }>;
    next: HelperLike<{
      Args: { Positional: [currentValue: unknown, useDeepEqual?: boolean | Array<unknown>, array?: Array<unknown>] };
      Return: unknown;
    }>;
    'has-next': HelperLike<{
      Args: { Positional: [currentValue: unknown, useDeepEqual?: boolean | Array<unknown>, array?: Array<unknown>] };
      Return: boolean;
    }>;
    previous: HelperLike<{
      Args: { Positional: [currentValue: unknown, useDeepEqual?: boolean | Array<unknown>, array?: Array<unknown>] };
      Return: unknown;
    }>;
    'has-previous': HelperLike<{
      Args: { Positional: [currentValue: unknown, useDeepEqual?: boolean | Array<unknown>, array?: Array<unknown>] };
      Return: boolean;
    }>;
    // Object helpers
    entries: HelperLike<{
      Args: { Positional: [obj: { [s: string]: unknown } | ArrayLike<unknown>] };
      Return: [string, unknown][];
    }>;
    'from-entries': HelperLike<{
      Args: { Positional: [entries: Iterable<readonly [PropertyKey, unknown]>] };
      Return: { [k: string]: unknown };
    }>;
    'group-by': HelperLike<{
      Args: { Positional: [byPath: string, array: AnyObject[] | AnyObject | Map<unknown, unknown> | Set<unknown>] };
      Return: Record<string, Array<unknown>>;
    }>;
    keys: HelperLike<{
      Args: { Positional: [obj: AnyObject] };
      Return: Array<string | number | symbol>;
    }>;
    pick: HelperLike<{
      Args: { Positional: [path: string, action?: AnyFunction] };
      Return: AnyFunction;
    }>;
    values: HelperLike<{
      Args: { Positional: [obj: AnyObject] };
      Return: Array<unknown | AnyObject>;
    }>;
    // Math helpers
    inc: HelperLike<{
      Args: { Positional: [stepOrVal: number, val?: number] };
      Return: number;
    }>;
    dec: HelperLike<{
      Args: { Positional: [stepOrVal: number, val?: number] };
      Return: number;
    }>;
  }
}
