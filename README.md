# solver

This library is a small utility to resolve an object's templated properties which might reference other properties in the same object or in a provided context object.

[![Build Status](https://secure.travis-ci.org/goliatone/gsolver.png)](http://travis-ci.org/goliatone/gsolver)

## Getting Started

Install the module with: `npm install solver`

## Examples
Check out the [example][examples] directory in the github repository.

A quick example:

```js
var Solver = require('..');

var context = {
    nick: 'Peperone',
    greeting: 'Hello',
    user: {
        name: 'Pepe',
        address: {
            city: 'New York'
        }
    }
};

var re = new Solver();

var output = re.solve({
    strings: {
        message: '${greeting} ${user.name}! Still living in ${user.address.city}?',
        welcome: '${nick}, how are you?'
    },
    references: {
        user: '@{user}'
    }
}, context);

console.log(output.strings.message); //Hello Pepe! Still living in New York?
console.log(output.strings.welcome); // Peperone, how are you?

console.log(output.references.user); // { name: 'Pepe', address: { city: 'New York' } }
```

## Documentation
_(Coming soon)_

## License
Copyright (c) 2015 goliatone  
Licensed under the MIT license.

[examples]:https://github.com/goliatone/gsolver/tree/master/example
