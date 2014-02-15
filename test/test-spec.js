var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
};
var Syntax = estraverse.Syntax;

var massWeight = {
  VARIABLEDECLARATION : 1,
  LITERAL : 1
};

function getMass(code) {
  var mass = 0;
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {
    if (node.type == Syntax.VariableDeclaration) {
      mass += massWeight.VARIABLEDECLARATION;
    }
    if (node.type == Syntax.Literal) {
      mass += massWeight.LITERAL;
    }
  });
  return mass;
}


describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('constant', function () {
    expect(getMass('0')).toBe(1);
  });

  it('declare variable', function () {
    expect(getMass('var x')).toBe(1);
  });

  it('variabel declaration and literal', function () {
    expect(getMass('var x = 0')).toBe(2);
  });

  it('call function', function () {
    expect(getMass('count()')).toBe(2);
  });
//
//  it('call function', function () {
//    expect(getMass('count(4)')).toBe(3);
//  });
//
//  it('call instance method without value', function () {
//    expect(getMass('object.print()')).toBe(3);
//  });
//
//  it('call instance method with value', function () {
//    expect(getMass('object.print(3)')).toBe(4);
//  });
//
//    it('call instance property', function () {
//    expect(getMass('object.property')).toBe(3);
//  });

});



