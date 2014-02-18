var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
}
var Syntax = estraverse.Syntax;

var massWeight = {
  VARIABLEDECLARATION : 1,
  LITERAL : 1,
  CALLEXPRESSION : 2,
  BINARYEXPRESSION : 2,
  MEMBEREXPRESSION : 3,
  IFSTATEMENT: 4,
  WHILESTATEMENT : 5,
  ASSIGNMENTEXPRESSION : 6
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
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      mass += massWeight.CALLEXPRESSION;
    }
    if (node.type == Syntax.MemberExpression) {
      mass += massWeight.MEMBEREXPRESSION;
    }
    if (node.type == Syntax.WhileStatement) {
      mass += massWeight.WHILESTATEMENT;
    }
    if (node.type == Syntax.BinaryExpression) {
      mass += massWeight.BINARYEXPRESSION;
    }
    if (node.type == Syntax.AssignmentExpression) {
      mass += massWeight.ASSIGNMENTEXPRESSION;
    }
    if (node.type == Syntax.IfStatement) {
      mass += massWeight.IFSTATEMENT;
    }
  });
  return mass;
}


describe('test', function () {
  it('test', function () {
    expect(true).toBe(true);
  });

  it('literal', function () {
    expect(getMass('0')).toBe(massWeight.LITERAL);
  });

  it('variable declaration', function () {
    expect(getMass('var x')).toBe(massWeight.VARIABLEDECLARATION);
  });

  it('variabel declaration and literal', function () {
    expect(getMass('var x = 0')).toBe(massWeight.VARIABLEDECLARATION + massWeight.LITERAL);
  });

  it('call expression', function () {
    expect(getMass('count()')).toBe(massWeight.CALLEXPRESSION);
  });

  it('call expression with literal', function () {
    expect(getMass('count(4)')).toBe(massWeight.CALLEXPRESSION + massWeight.LITERAL);
  });

  it('method expression call without value', function () {
    expect(getMass('object.print()')).toBe(massWeight.MEMBEREXPRESSION);
  });

  it('method expression call with literal', function () {
    expect(getMass('object.print(3)')).toBe(massWeight.MEMBEREXPRESSION + massWeight.LITERAL);
  });

  it('method expression', function () {
    expect(getMass('object.property')).toBe(massWeight.MEMBEREXPRESSION);
  });

  //Loop Examples
  it('while loop without literal', function () {
    expect(getMass('while(false){}')).toBe(massWeight.WHILESTATEMENT + massWeight.LITERAL);
  });

  it('while loop with binary expression', function () {
    expect(getMass('while(i<1){}')).toBe(massWeight.WHILESTATEMENT + massWeight.BINARYEXPRESSION + massWeight.LITERAL);
  });

  it('assignment expression', function () {
    expect(getMass('i = 1')).toBe(massWeight.ASSIGNMENTEXPRESSION + massWeight.LITERAL);
  });

  it('assignment expression with binary expression', function () {
    expect(getMass('i = i+1')).toBe(massWeight.ASSIGNMENTEXPRESSION + massWeight.BINARYEXPRESSION + massWeight.LITERAL);
  });

  it('call expression with binary expression', function () {
    expect(getMass('count(i-1)')).toBe(massWeight.CALLEXPRESSION + massWeight.BINARYEXPRESSION + massWeight.LITERAL);
  });
  it('condition', function () {
    expect(getMass('if(false){}')).toBe(massWeight.IFSTATEMENT + massWeight.LITERAL);
  });
  it('condition with binary expression', function () {
    expect(getMass('if(i>0){}')).toBe(massWeight.IFSTATEMENT + massWeight.BINARYEXPRESSION + massWeight.LITERAL);
  });
});



