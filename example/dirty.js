var Solver = require('..');

var s = new Solver();

var context = {
    name:'Pepe',
    hola: 'Hello',
    user:{
        name: 'Peperone',
        address:{
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
    }
}, context);
console.log('***********')
console.log(solved.greet)
console.log(solved.message)
console.log(solved.testing)

s.template.openTag = '@{';
solved = s.solve({
    message:'@{name} was here!',
    greet: '@{hola}, @{user.address.city}?'
}, context);

console.log('|||||||||||||||||')
console.log(solved.greet)
console.log(solved.message)

s.template.openTag = '${';
solved = s.solve(context);
console.log('///////////////////')
console.log(solved.name)
console.log(solved.hola)
console.log(solved.greeting)
