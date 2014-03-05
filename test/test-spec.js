var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');
var json2csv = require('json2csv');
var fs = require('fs');

function traverse(tree, transform) {
  estraverse.traverse(tree, {
    enter: function (node) {
      return transform(node, this.parents());
    }
  });
}
var Syntax = estraverse.Syntax;

function convertJsonToCsv(jsonObject, filename) {
  var filenameAsString = filename.toString();
  json = jsonObject;

  json2csv(
      {
        data: json,
        fields: [
          'VariableDeclartationCounter',
          'LiteralCounter',
          'CallExpressionCounter',
          'BinaryExpressionCounter',
          'MemberExpressionCounter',
          'IfStatementCounter',
          'WhileStatementCounter',
          'AssignmentExpressionCounter',
          'UpdateExpressionCounter'
        ]
      },
      function (err, csv) {
        if (err) {
          console.log(err);
        }
        fs.writeFile(filenameAsString + '.csv', csv, function (err) {
              if (err) {
                throw err;
              }
              console.log('file saved');
            }
        );
      }
  );
}

function getMass(code) {
  var mass = 0;
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {

    if (node.type == Syntax.VariableDeclaration) {
      mass += massWeight.VARIABLEDECLARATION;
      ++(transformationCounters[0].VariableDeclartationCounter);
    }
    if (node.type == Syntax.Literal) {
      mass += massWeight.LITERAL;
      ++transformationCounters[0].LiteralCounter;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      mass += massWeight.CALLEXPRESSION;
      ++transformationCounters[0].CallExpressionCounter;
    }
    if (node.type == Syntax.MemberExpression) {
      mass += massWeight.MEMBEREXPRESSION;
      ++transformationCounters[0].MemberExpressionCounter;
    }
    if (node.type == Syntax.WhileStatement) {
      mass += massWeight.WHILESTATEMENT;
      ++transformationCounters[0].WhileStatementCounter;
    }
    if (node.type == Syntax.ForStatement) {
      mass += massWeight.FORSTATEMENT;
      ++transformationCounters[0].ForStatementCounter;
    }
    if (node.type == Syntax.ForInStatement) {
      mass += massWeight.FORINSTATEMENT;
      ++transformationCounters[0].ForInStatementCounter;
    }
    if (node.type == Syntax.BinaryExpression) {
      mass += massWeight.BINARYEXPRESSION;
      ++transformationCounters[0].BinaryExpressionCounter;
    }
    if (node.type == Syntax.AssignmentExpression) {
      mass += massWeight.ASSIGNMENTEXPRESSION;
      ++transformationCounters[0].AssignmentExpressionCounter;
    }
    if (node.type == Syntax.IfStatement) {
      mass += massWeight.IFSTATEMENT;
      ++transformationCounters[0].IfStatementCounter;
    }
    if (node.type == Syntax.UpdateExpression) {
      mass += massWeight.UPDATEEXPRESSION;
      ++transformationCounters[0].UpdateExpressionCounter;
    }
  });
  return mass;
}

var transformationCounters = [
  {
    VariableDeclartationCounter: 0,
    LiteralCounter: 0,
    CallExpressionCounter: 0,
    BinaryExpressionCounter: 0,
    MemberExpressionCounter: 0,
    IfStatementCounter: 0,
    WhileStatementCounter: 0,
    ForStatementCounter: 0,
    ForInStatementCounter: 0,
    AssignmentExpressionCounter: 0,
    UpdateExpressionCounter: 0
  }
];

var massWeight = {
  VARIABLEDECLARATION: 1,
  LITERAL: 1,
  CALLEXPRESSION: 2,
  BINARYEXPRESSION: 2,
  MEMBEREXPRESSION: 3,
  IFSTATEMENT: 4,
  WHILESTATEMENT: 5,
  FORSTATEMENT: 5,
  FORINSTATEMENT: 5,
  ASSIGNMENTEXPRESSION: 6,
  UPDATEEXPRESSION: 2
};

var kataSessions = {
  sessions: [
    {
      name: 'romanNumeralsS1',
      code: function () {
        var arabicDigits = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        var romanDigits = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        var convert = function (arabic) {
          var roman = "";

          for (var i = 0; i < arabicDigits.length; i++) {
            while (arabic >= arabicDigits[i]) {
              roman += romanDigits[i];
              arabic -= arabicDigits[i];
            }
          }
          return roman;
        };
      }
    }
  ]
};

function getMassOfSessions() {
  var entireString;
  var functionBodyString;
  var massOfSession;

  for (var i = 0; i < kataSessions.sessions.length; i++) {
    entireString = kataSessions.sessions[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));
    massOfSession = getMass(functionBodyString);
    kataSessions.sessions[i].mass = massOfSession;
    convertJsonToCsv(transformationCounters, kataSessions.sessions[i].name);
    console.log('TOTAL MASS OF ' + kataSessions.sessions[i].name + ': ', massOfSession);
    console.log('NUMBER OF EACH TRANSFORMATION: ', transformationCounters);
  }
}

getMassOfSessions();


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

  it('for loop with literal', function () {
    expect(getMass('for (var i=0; i<5; i++){}')).toBe(
        massWeight.FORSTATEMENT + massWeight.VARIABLEDECLARATION + massWeight.LITERAL + massWeight.BINARYEXPRESSION +
        massWeight.LITERAL + massWeight.UPDATEEXPRESSION
    );

  it('for in loop', function () {
    expect(getMass('for(var property in myObj){}')).toBe(
        massWeight.FORINSTATEMENT + massWeight.VARIABLEDECLARATION
    );
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