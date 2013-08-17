###
	Javascript Object Oriented
###

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