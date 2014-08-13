# basic-class

### when all you want is something extremely basic

basic-class is an extraction of the class code from backbone (which in
turn, is heavily based on john resigs famous class implementation). It
provides:

- class definition
- singleton definiton
- simple inheritance
- type name showing up in the inspector (rather then `child.extends`)


## Usage

for a full example of all features, check out the test file

```js
var Class = require('basic-class');

var MyClass = Class.extend({
  __name__: 'MyClass', // if this is omitted, it will show as "Class" in the inspector

  initialize: function() { // constructor
    this.value = 0;
  },

  add: function(n) {
    this.value += n;
  },

  getValue: function() {
    return this.value;
  }
});

var c = new MyClass();
c.getValue(); //=> 0
c.add(10);
c.getValue(); //=> 10
```
