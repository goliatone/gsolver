'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var path = require('path');

// var fixture = path.resolve.bind(path, __dirname, 'fixtures');

sinon.assert.expose(assert, { prefix: '' });

var Solver = require('..');

/*
 * Mute console :)
 */
Solver.prototype.logger = require('noop-console')();

describe('Solver', function(){

    describe('constructor', function(){
        it('should provide a DEFAULTS object', function(){
            assert.isObject(Solver.DEFAULTS);
        });

        it('should not modify string templates if not found in the context', function(){
            var solver = new Solver();
            var solved = solver.solve({
                name: '${name}'
            }, {});
            assert.equal(solved.name, '${name}');
        });

        it('should replace tags with its value in the context object', function(){
            var solver = new Solver();
            var solved = solver.solve({
                name: '${name}'
            }, {
                name: 'Peperone'
            });
            assert.equal(solved.name, 'Peperone');
        });

        it('should replace multiple tags with its value in the context object', function(){
            var solver = new Solver();
            var solved = solver.solve({
                fullName: '${firstName} ${lastName}'
            }, {
                firstName: 'Pepe',
                lastName: 'Rone'
            });
            assert.equal(solved.fullName, 'Pepe Rone');
        });

        it('should replace nested elements', function(){
            var solver = new Solver();
            var solved = solver.solve({
                city: '${user.address.city}'
            }, {
                user: {
                    address: {
                        city: 'New York'
                    }
                }
            });
            assert.equal(solved.city, 'New York');
        });

        it('should take a single argument and solve template tags in the context itself', function(){
            var solver = new Solver();
            var solved = solver.solve({
                name: 'Peperone',
                greeting: '${name} was here'
            });
            assert.equal(solved.greeting, 'Peperone was here');
        });

        it('should resolve object references', function(){
            var solver = new Solver();
            var context = {
                user: {
                    name: 'Peperone',
                    address: {
                        city:'New York'
                    }
                }
            };

            var solved = solver.solve({
                reference: '@{user.address}'
            }, context);
            assert.deepEqual(solved.reference, context.user.address);
        });

        it('should resolve object references with custom tags', function(){
            var solver = new Solver({
                objectOpenTag: '#{',
                objectCloseTag: '}#'
            });
            var context = {
                user: {
                    name: 'Peperone',
                    address: {
                        city:'New York'
                    }
                }
            };

            var solved = solver.solve({
                reference: '#{user.address}#'
            }, context);
            assert.deepEqual(solved.reference, context.user.address);
        });

        it('should support custom tags', function(){
            var solver = new Solver({
                openTag: '<%',
                closeTag: '%>'
            });
            var solved = solver.solve({
                fullName: '<%firstName%> <%lastName%>'
            }, {
                firstName: 'Pepe',
                lastName: 'Rone'
            });
            assert.equal(solved.fullName, 'Pepe Rone');
        });

        it('should guard against infinity recursion if a tempalte is not defined', function(){
            var solver = new Solver();
            var solved = solver.solve({
                name: '${user.address.city}'
            }, {
                user: {
                    addres: {}
                }
            });
            assert.equal(solved.name, '${user.address.city}');
        });
    });
});
