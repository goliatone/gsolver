var extend = require('gextend');

var DEFAULTS = {
    openTag: '\\${',
    closeTag: '}'
};

function Template(config){
    config = extend({}, DEFAULTS, config);
    if(!(this instanceof Template)) return new Template(config);

    var exp = this.buildExpression(config);
    this.rxp = new RegExp(exp, 'g');

    extend(this, config);
}

Template.DEFAULTS = DEFAULTS;


Template.prototype.buildExpression = function(){
    config.openTag = this.escape(config.openTag);
    config.closeTag = this.escape(config.closeTag);

    return config.openTag + '([^' + config.closeTag + '\\r\\n]*)' + config.closeTag;
};

Template.prototype.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

Template.prototype.resolvePropertyChain = function(target, path, defaultValue) {

    if (!target || !path) return defaultValue;
    path = path.split('.');
    // console.warn('path', path, target);
    var l = path.length,
        i = 0,
        p = '';
    for (; i < l; ++i) {
        p = path[i];
        if (target.hasOwnProperty(p)) target = target[p];
        else return defaultValue;
    }
    return target;
}

Template.prototype.compile = function (template, context, openTag, closeTag) {
    if (!template) return '';
    if (!context) return template;

    openTag = openTag || this.openTag, closeTag = closeTag || this.closeTag;

    template = template.split('.').join('\\.');
    var self = this;
    function replaceTokens() {
        var prop = arguments[1];
        prop = prop.replace(/\\/g, '');
        return self.resolvePropertyChain(context, prop, openTag + prop + closeTag);
    };

    return template.replace(this.rxp, replaceTokens)
                   .replace(/\\./g, '.');
}

Template.prototype.needsInterpolation = function (key, openTag, closeTag) {
    openTag = openTag || this.openTag, closeTag = closeTag || this.closeTag;
    if (!key || typeof key !== 'string') return false;
    return !!key.match(this.rxp);
}


module.exports = Template;


