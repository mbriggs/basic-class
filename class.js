var _ = require('underscore');

var extend = function(protoProps, staticProps){
    var parent = this;
    var child;

    var nameProp = ((staticProps && staticProps.nameProp) || this.nameProp);

    if (protoProps) {
        var name = (protoProps[nameProp] || this[nameProp]);
        var constructor = protoProps.hasOwnProperty('constructor') ? protoProps.constructor : this;

        protoProps = _.extend(protoProps, { constructor: namedConstructor(name, constructor) });
    }

    if(protoProps && _.has(protoProps, 'constructor')){
        child = protoProps.constructor;
    } else{
        child = function(){
            return parent.apply(this, arguments);
        };
    }
    _.extend(child, parent, staticProps);

    var Surrogate = function(){
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    if(protoProps) _.extend(child.prototype, protoProps);

    child.__super__ = parent.prototype;

    return child;
};

var Class = function(){ this.initialize.apply(this, arguments); };

Class.nameProp = '__name__';
Class.__name__ = 'Class';
Class.prototype.initialize = function(){};

Class.extend = extend;
Class.define = function(definition){
    var klass = this.extend(definition);
    return new klass();
};

function namedConstructor(name, constructor) {
    var fn = new Function('constructor', 'return function ' + name + '(){ '
                          + 'constructor.apply(this, arguments) '
                          + '};');
    return fn(constructor);
}

module.exports = Class;
