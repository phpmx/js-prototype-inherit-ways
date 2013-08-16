/*
	Javascript Object Oriented
*/

/*
	Sample 1 (Object.create)
*/

var parent = {
	getVal: function(){
		return this.val;
	},
	val: 10,
	log: function(msg){
		if(window.console) console.log(msg);
	}
};

// Child
var child = Object.create(parent);
child.val = 20;
child.getVal = function(){
	return parent.getVal.call(this) + "!";
}

// grandchild
var grandchild = Object.create(child);
grandchild.val = 30;
grandchild.getVal = function(){
	return child.getVal.call(this) + "!!";
}

// results

parent.log(parent.getVal());

child.log(child.getVal());

grandchild.log(grandchild.getVal());



/*
	Sample 2 (new way)
*/

var Parent = (function(){

	function Parent(msg){
		// empty constuctor
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
		// empty constuctor
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
		// empty constuctor
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

console.log(parent.getVal());

var child = new Child("new Child constuctor");

console.log(child.getVal());

var grandChild = new GrandChild("new Child constuctor");

console.log(grandChild.getVal());

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