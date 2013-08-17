
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
