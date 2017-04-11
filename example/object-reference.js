var Solver = require('..');

var s = new Solver();

var context = {
    name:'Pepe',
    hola: 'Hello',
    user: {
        name: 'Peperone',
        address: {
            city:'New York'
        }
    },
    greeting: '${name}, how are you?'
};

var solved = s.solve({
    message:'${name}, how are you?',
    greet: '${hola} ${user.name}!!! Still living in ${user.address.city}?',
    testing: {
       nested: {
           templates: '${user.address.city}'
       }
   },
   userAddress: '@{user.address}'
}, context);

console.log('***********');
console.log('address', solved.userAddress);
console.assert(solved.userAddress === context.user.address);
