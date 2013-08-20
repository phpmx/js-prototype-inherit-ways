js-prototype-inherit-ways
=========================

Hoy toca hablar un poco de javascript y su herencia prototipal. Antes que nada debemos entender que todo en javascript es un objeto, de los cuales hay de diferentes tipos, desde un array hasta una función son objetos. Otra cosa importante cuando hacemos herencia con js es tener en mente que una copia de la variable no hace una copia literal, solo hace una copia de la referencia a memoria; es decir, si copiamos una función y después la función cambia, esto cambiará la copia también, debido a que solo es un puntero. Ejemplo:

```javascript
var obj1 = {
	log: function(){
		console.log(this.name);
	},
	name: "obj1",
};
var obj2 = obj1;
// try one
obj1.log();
obj2.log();
// try 2
obj2.name = "obj2";
obj1.log();
obj2.log();
// try 3
obj1.name = "Holaaaaaaaaaaa";
obj1.log();
obj2.log();
```

El output es el siguiente:

```
obj1
obj1
obj2
obj2
Holaaaaaaaaaaa
Holaaaaaaaaaaa
```

**Lo que nos indica que solo hace copia al puntero y no del objeto como tal**. Es por eso que tenemos que saber usar la herencia prototipal en js, de lo contrario no podemos meter en problemas cuando algún objeto cambie. Pero como ya saben que js es un lenguaje muy dinámico, hay varias formas de hacer herencia:

Ejemplo 1
=========

Podemos usar **Object.create()** y enviar como parametro el objeto padre, de tal manera que se creara el prototipo correspondiente:

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

Ejemplo 2
=========

También se puede usar **new** para llamar nuevas instancias de tu clase, la syntaxis es un poco más verbosa, pero a mi gusto está genial debido a que puedes jugar con los constructores, incluso es más facil de leér.

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
var grandChild = new GrandChild("new GrandChild constuctor");

parent.log(parent.getVal());
child.log(child.getVal());
grandChild.log(grandChild.getVal());
```

Ejemplo 3
=========

Este ejemplo no es una herencia como tal, es más como un merge entre dos objetos usando librerias como **jQuery** y **Underscore**. Lo cual te puede ser util y simple para ciertos casos genericos:

```javascript
/*
	Sample 3 (jQuery)
*/

var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10
}

var child = $.extend({},parent,{ 
	getVal: function(){
		return this.val + "!!";
	},
	val: 200 
});

console.log(parent.getVal());
console.log(child.getVal());

/*
	Sample 4 (underscore)
*/

var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10
}

var child = { 
	getVal: function(){
		return this.val + "!!";
	},
	val: 200 
}

child = _.extend({},parent,child);

console.log(parent.getVal());
console.log(child.getVal());
```

Ejemplo 4
=========

También podemos usar un poco de la belleza sintactica de coffeeScript

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

Como material adicional les comparto una muy buena platica que se dió en **jsconf** de este año. Les comparto el video y los slides

[embed]http://youtu.be/NyClWddeO_A[/embed]

* [PDF](http://dl.2ality.com/2012/10/jsconf.pdf)

* [Github](https://github.com/phpmx/js-prototype-inherit-ways)