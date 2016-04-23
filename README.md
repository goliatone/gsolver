# solver

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
console.log(output.strings.message);
//Hello Pepe! Still living in New York?
console.log(output.strings.welcome);
// Peperone, how are you?
```

This library is a small utility to resolve an object's templated properties which might reference other properties in the same object or in a provided context object.


## Getting Started
Install the module with: `npm install solver`

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 goliatone  
Licensed under the MIT license.
