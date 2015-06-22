/*
 * Solver
 * https://github.com/goliatone/Solver
 *
 * Copyright (c) 2015 goliatone
 * Licensed under the MIT license.
 */

'use strict';

var extend = require('gextend');
var _inherit = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var Flattener = require('flattener');
var Template = require('./template');

var DEFAULTS = {
    autoinitialize: true,
    clone: true,
    openTag: '${',
    closeTag: '}'
};

function Solver(config){
    EventEmitter.call(this);
    config = extend({}, this.constructor.DEFAULTS, config);

    if(config.autoinitialize ) this.init(config);
}

_inherit(Solver, EventEmitter);

Solver.DEFAULTS = DEFAULTS;

Solver.prototype.init = function(config){
    if(this.initialized) return this;
    this.initialized = true;

    extend(this, this.constructor.DEFAULTS, config);

    if(this.template) return this;

    this.template = new Template({
        openTag: this.openTag,
        closeTag: this.closeTag
    });
};

Solver.prototype.solve = function(bean, context){
    var flat = Flattener.flatten(bean);

    var out = this.clone ? {} : extend({}, bean);

    var value;
    Object.keys(flat).map(function(key){
        value = bean[key];
        if(!this.template.needsInterpolation(value)) return;
        out[key] = this.template.compile(value, context);
    }, this);

    this.emitNext('solve', out);

    return out;
};

Solver.prototype.emitNext = function(type, payload){
    process.nextTick(function(){
        this.emit(type, payload);
    }.bind(this));

    return this;
};

Solver.prototype.logger = console;

/**
 * Exports module
 */
module.exports = Solver;
