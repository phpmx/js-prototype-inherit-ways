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