js-prototype-inherit-ways
=========================

Hoy vamos a hablar un poco de la herencia prototipal y al final vamos a crear una clase con coffeeScript. Al ser js un lenguaje tan dinámico podemos usar diferentes tipos de syntaxis para definir una herencia.

Object.create
=============


```javascript
var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10,
	log: function(msg){
		if(window.console) console.log(msg);
	}
};

var child = Object.create(parent);
child.val = 20;
child.getVal = function(){
	return parent.getVal.call(this) + "!";
}

var grandchild = Object.create(child);
grandchild.val = 30;
grandchild.getVal = function(){
	return parent.getVal.call(this) + "!!";
}

parent.log(parent.getVal());
child.log(child.getVal());
grandchild.log(grandchild.getVal());
``` 

output:

```
10
20!
30!!
```

Usando constructores
=====================

De esta manera tenemos una syntaxis mas verbosa pero también podemos personalizar las cosas en los constructores y pienso que es más fácil de leér

```javascript
var Parent = (function(){

	function Parent(msg){
		this.log(msg);
	}

	Parent.prototype.log = function(msg){
		if(window.console) console.log(msg);
	}

	Parent.prototype.val = 10;

	Parent.prototype.getVal = function(){
		return this.val;
	}

	return Parent;

})();

var Child = (function(_super){

	function Child(msg){
		this.log(msg);
	}

	Child.prototype = new _super;

	Child.prototype.val = 100;

	Child.prototype.getVal = function(){
		return _super.prototype.getVal.call(this) + "!";
	}

	return Child;

})(Parent);

var GrandChild = (function(_super){

	function GrandChild(msg){
		this.log(msg);
	}

	GrandChild.prototype = new _super;

	GrandChild.prototype.val = 100000;

	GrandChild.prototype.getVal = function(){
		return _super.prototype.getVal.call(this) + "!!";
	}

	return GrandChild;

})(Child);


var parent = new Parent("new Parent constuctor");
var child = new Child("new Child constuctor");
var grandChild = new GrandChild("new Child constuctor");

parent.log(parent.getVal());
child.log(child.getVal());
grandChild.log(grandChild.getVal());
```

output:

```
new Parent constuctor
new Child constuctor
new GrandChild constuctor
10
100!
100000!!!
```

jQuery y Underscore
===================

Con estas dos librerias puedes hacer algo parecido, pero no es herencia, en realidad solo hace un merge entre dos objetos.

```
/*
	 (jQuery)
*/
var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10,
	log: function(msg){
		if(window.console) console.log(msg);
	}
}

var child = $.extend({},parent,{ 
	getVal: function(){
		return this.val + "!!";
	},
	val: 200 
});

parent.log(parent.getVal());
child.log(child.getVal());

/*
	 (underscore)
*/

var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10,
	log: function(msg){
		if(window.console) console.log(msg);
	},
}

var child = { 
	getVal: function(){
		return this.val + "!!";
	},
	val: 200 
}

child = _.extend({},parent,child);

parent.log(parent.getVal());
child.log(child.getVal());
```

CoffeeScript
=============

Y un poco de la bella syntaxis de coffeeScript

```coffee
class Parent 
	constructor: (msg = "Parent constuctor")-> @log msg
	log: (msg)-> if window.console? then console.log msg
	val: 10
	getVal: -> @val

class Child extends Parent 
	constructor: -> super;
	val: 100
	getVal: -> "#{super()}!"

class GrandChild extends Child
	constructor:-> super;
	val: 1000
	getVal: -> "#{super()}!!"


parent = new Parent
child = new Child
grandChild = new GrandChild

parent.log parent.getVal() 
child.log child.getVal() 
grandChild.log grandChild.getVal() 
```

Compilado

```javascript

/*
	Javascript Object Oriented
*/

(function() {
  var Child, GrandChild, Parent, child, grandChild, parent,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Parent = (function() {

    function Parent(msg) {
      if (msg == null) msg = "Parent constuctor";
      this.log(msg);
    }

    Parent.prototype.log = function(msg) {
      if (window.console != null) return console.log(msg);
    };

    Parent.prototype.val = 10;

    Parent.prototype.getVal = function() {
      return this.val;
    };

    return Parent;

  })();

  Child = (function(_super) {

    __extends(Child, _super);

    function Child() {
      Child.__super__.constructor.apply(this, arguments);
    }

    Child.prototype.val = 100;

    Child.prototype.getVal = function() {
      return "" + (Child.__super__.getVal.call(this)) + "!";
    };

    return Child;

  })(Parent);

  GrandChild = (function(_super) {

    __extends(GrandChild, _super);

    function GrandChild() {
      GrandChild.__super__.constructor.apply(this, arguments);
    }

    GrandChild.prototype.val = 1000;

    GrandChild.prototype.getVal = function() {
      return "" + (GrandChild.__super__.getVal.call(this)) + "!!";
    };

    return GrandChild;

  })(Child);

  parent = new Parent;

  child = new Child;

  grandChild = new GrandChild;

  parent.log(parent.getVal());

  child.log(child.getVal());

  grandChild.log(grandChild.getVal());

}).call(this);

```