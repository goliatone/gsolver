# solver

This library is a small utility to resolve an object's templated properties which might reference other properties in the same object or in a provided context object.

## Getting Started

Install the module with: `npm install solver`

## Examples
Check out the [example][examples] directory in the github repository.

A quick example:

```js
var context = {
    nick: 'Peperone',
    greeting: 'Hello',
    user: {
        name: 'Pepe',
        address: {
            city: 'New York'
        }
    },
    strings: {
        message: '${hola} ${user.name}! Still living in ${user.address.city}?',
        welcome: '${nick}, how are you?'
    }
};
var re = new Solver();
var output = re.solve(context);
console.log(output.strings.message); //Hello Pepe! Still living in New York?
console.log(output.strings.welcome); // Peperone, how are you?
```

## Documentation
_(Coming soon)_

## License
Copyright (c) 2015 goliatone  
Licensed under the MIT license.

[examples]:https://github.com/goliatone/gsolver/tree/master/example
