var Solver = require('..');

var s = new Solver({
    openTag: '#{',
    closeTag: '}'
});

var context = {
    name:'Pepe',
    hola: 'Hello',
    user: {
        name: 'Peperone',
        address: {
            city:'New York'
        }
    },
    greeting: '#{name}, how are you?'
};

var solved = s.solve({
    message:'#{name}, how are you?',
    greet: '#{hola} #{user.name}!!! Still living in #{user.address.city}?',
    testing: {
       nested: {
           templates: '#{user.address.city}'
       }
   }
}, context);


console.log('***********');
console.log(solved.greet);
console.log(solved.message);
console.log(solved.testing);
