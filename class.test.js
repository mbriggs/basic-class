var expect = require('chai').expect;
var sinon = require('sinon');
var Class = require('./class');

describe("Class", function(){


  describe("simple extension", function(){
    var Extended;

    beforeEach(function(){
      Extended = Class.extend({ foo: 'bar' });
    });

    it("runs initialize on instanciation", sinon.test(function(){
      var init = sinon.spy(Extended.prototype, 'initialize');

      new Extended();

      expect(init).to.have.been.called;
    }));

    it("references defined properties", function(){
      expect(new Extended().foo).to.eq('bar');
    });

    it("can be further extended", function(){
      var Inception = Extended.extend({});
      expect(new Extended().foo).to.eq('bar');
    });
  });

  describe("defining singletons", function(){
    var Singleton;

    beforeEach(function(){
      Singleton = Class.define({ bin: 'baz' });
    });

    it("has properties", function(){
      expect(Singleton.bin).to.eq('baz');
    });

    it("cannot be extended", function(){
      expect(Singleton.extend).to.be.undefined;
    });
  });

  describe("naming", function(){
    it("defaults to Class", function(){
      var Basic = Class.extend({});
      var basic = new Basic();
      expect(basic.constructor.name).to.eq('Class');
    });

    it("can be customized", function(){
      var Custom = Class.extend({
        __name__: 'Custom'
      });

      var custom = new Custom();

      expect(custom.constructor.name).to.eq('Custom');
    });

    it("can customize what property is being used for class name", function(){
      var Custom = Class.extend({
        foo: 'BLERG'
      }, { nameProp: 'foo' });

      var custom = new Custom();

      expect(custom.constructor.name).to.eq('BLERG');
    });
  });
});
