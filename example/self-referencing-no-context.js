var Solver = require('..');

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
        message: '${greeting} ${user.name}! Still living in ${user.address.city}?',
        welcome: '${nick}, how are you?'
    }
};
var re = new Solver();
var output = re.solve(context);
console.log(output.strings.message);
console.log(output.strings.welcome);
