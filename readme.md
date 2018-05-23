# concat-each

Iterates nested loops and concatenates values onto an Array or Set.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i concat-each
```

## API

The module exports a single function.

### Parameters

1. `base` (Array, Set, WeakSet): The collection onto which new items should be concatenated. If you want to create a new collection, pass in `[]` or `new Set()` or `new WeakSet()`.
2. Variadic: `...iterables` (one or more of: iterable): Iterable collections of items to pass to `cb`. Specify multiple iterables if you want nested loops.
3. `cb` (function): A callback which accepts an argument for each iterable in `iterables` and returns an array of items to concatenate onto `base`.
4. Optional: Object argument:
    * `arrays` / `sets` / `weakSets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Set`/`WeakSet` (respectively).
    * `loose` (boolean): Whether or not to compare values loosely (as defined by `looselyEquals`) for the purpose of testing uniqueness if `unique` is `true`. Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `unique` (boolean): Whether or not to refrain from adding values that already exist in `base`. Defaults to `false`. You can define what uniqueness means by using the `loose` and `looselyEquals` arguments.

### Return Value

Modifies and returns `base`.

## Example

Explaining the module is best done by showing the code it replaces:

### Before

```javascript
const n = []
for (const i of [1, 2, 3]) {
  for (const j of [2, 3, 4]) {
    const sum = i + j
    if (sum % 2 === 0) n.push(sum)
  }
}

n // [4, 4, 6, 6]
```

### After

```javascript
const concatEach = require('concat-each')

const n = concatEach([], [1, 2, 3], [2, 3, 4], (i, j) => (i + j) % 2 === 0 ? [i + j] : []) // [4, 4, 6, 6]
```

## Related

* [neach](https://github.com/lamansky/neach): Nested forEach
