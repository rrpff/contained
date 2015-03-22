# contained

Checks if values are contained in a comparator array using deep equality.

RegExps and Functions are evaluated rather than compared.

Comparators are run through until one evaluates `true`.

## Installation

```sh
npm install --save contained
```

```js
var contained = require("contained");
```

## Usage

`contained(array)` will return a checking function.

```js
var checker = contained([
    // will be compared to value
    5,
    // will be deeply compared with value
    ["a", "b", "c"],
    // will test value
    new RegExp("[a-z]+", "ig"),
    // will be called with value
    function(num){
        return typeof num === "number" && num > 5;
    }
]);

checker(5); // true, 5 is in the array.
checker("Hello"); // true, the regexp evaluates true.
checker("a"); // false
checker(["a", "b", "c"]); // true. deeply matches a value.
checker(4); // false
checker(10); // true, the function returns true when passed 10.
```

`checker.list` can be used to check multiple values and return a single boolean. All values must pass.

```js
var checker = contained([1, 2, 3]);
checker.list([1, 2]); // true
checker.list([1, 2, 5]); // false
```

You can check values directly by passing it directly to `contained` or `contained.list`.

```js
console.log(contained([1, 2, 3], 1)); // true
console.log(contained.list([1, 2, 3], [1, 2])); // true
```