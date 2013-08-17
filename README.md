js-prototype-inherit-ways
=========================

Hoy vamos a hablar un poco de la herencia prototipal y al final vamos a crear una clase con coffeeScript. Al ser js un lenguaje tan dinámico podemos usar diferentes tipos de syntaxis para definir una herencia.

Tipo de syntaxis usando **Object.create**
==========================================

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

Usando la palabra **new** y agregando constructores
====================================================

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

