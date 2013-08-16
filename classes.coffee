###
	Javascript Object Oriented
###

class Utilities
	constructor: (msg = "main constructor")-> @setMsg msg
	setMsg: (errorStr)-> if window.console? then console.log errorStr else alert errorStr			
	checkNan: (a,b)->
		if isNaN( a ) and isNaN( b )
			@setMsg "only numeric values are allowed"
			return false
		true

class Addition extends Utilities
	constructor: ->
		super "Addition constructor"		
	getSum:  (@a = 0, @b = 0)-> 
		if @checkNan @a, @b then return (@a + @b)		


class Subtraction extends Addition
	constructor: -> 
		super "Subtraction constructor"
	getSub: (@a = 0,@b = 0)->
		if @checkNan @a, @b then return @a - @b else false		


###
	proto
###
subtraction = new Subtraction

console.log subtraction.getSub(5,3)

