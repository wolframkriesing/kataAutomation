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
          'SwitchStatementCounter',
          'SwitchCaseCounter',
          'BreakStatementCounter',
          'IfStatementCounter',
          'WhileStatementCounter',
          'ForStatementCounter',
          'ForInStatementCounter',
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
//    console.log('NODE TYPE', node.type);
    if (node.type == Syntax.VariableDeclaration) {
      mass += massWeight.VARIABLEDECLARATION;
      ++(transformationCounters.VariableDeclartationCounter);
    }
    if (node.type == Syntax.Literal) {
      mass += massWeight.LITERAL;
      ++transformationCounters.LiteralCounter;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      mass += massWeight.CALLEXPRESSION;
      ++transformationCounters.CallExpressionCounter;
    }
    if (node.type == Syntax.MemberExpression) {
      mass += massWeight.MEMBEREXPRESSION;
      ++transformationCounters.MemberExpressionCounter;
    }
    if (node.type == Syntax.WhileStatement) {
      mass += massWeight.WHILESTATEMENT;
      ++transformationCounters.WhileStatementCounter;
    }
    if (node.type == Syntax.ForStatement) {
      mass += massWeight.FORSTATEMENT;
      ++transformationCounters.ForStatementCounter;
    }
    if (node.type == Syntax.ForInStatement) {
      mass += massWeight.FORINSTATEMENT;
      ++transformationCounters.ForInStatementCounter;
    }
    if (node.type == Syntax.BinaryExpression) {
      mass += massWeight.BINARYEXPRESSION;
      ++transformationCounters.BinaryExpressionCounter;
    }
    if (node.type == Syntax.AssignmentExpression) {
      mass += massWeight.ASSIGNMENTEXPRESSION;
      ++transformationCounters.AssignmentExpressionCounter;
    }
    if (node.type == Syntax.SwitchStatement) {
      mass += massWeight.SWITCHSTATEMENT;
      ++transformationCounters.SwitchStatementCounter;
    }
    if (node.type == Syntax.SwitchCase) {
      mass += massWeight.SWITCHCASE;
      ++transformationCounters.SwitchCaseCounter;
    }
    if (node.type == Syntax.BreakStatement) {
      mass += massWeight.BREAKSTATEMENT;
      ++transformationCounters.BreakStatementCounter;
    }
    if (node.type == Syntax.IfStatement) {
      mass += massWeight.IFSTATEMENT;
      ++transformationCounters.IfStatementCounter;
    }
    if (node.type == Syntax.UpdateExpression) {
      mass += massWeight.UPDATEEXPRESSION;
      ++transformationCounters.UpdateExpressionCounter;
    }
  });
  return mass;
}

function resetTransormationCounters() {
    transformationCounters.VariableDeclartationCounter = 0,
    transformationCounters.LiteralCounter = 0,
    transformationCounters.CallExpressionCounter = 0,
    transformationCounters.BinaryExpressionCounter = 0,
    transformationCounters.MemberExpressionCounter = 0,
    transformationCounters.SwitchStatementCounter = 0,
    transformationCounters.SwitchCaseCounter = 0,
    transformationCounters.BreakStatementCounter = 0,
    transformationCounters.IfStatementCounter = 0,
    transformationCounters.WhileStatementCounter = 0,
    transformationCounters.ForStatementCounter = 0,
    transformationCounters.ForInStatementCounter = 0,
    transformationCounters.AssignmentExpressionCounter = 0,
    transformationCounters.UpdateExpressionCounter = 0
}

var transformationCounters = {
    VariableDeclartationCounter: 0,
    LiteralCounter: 0,
    CallExpressionCounter: 0,
    BinaryExpressionCounter: 0,
    MemberExpressionCounter: 0,
    SwitchStatementCounter: 0,
    SwitchCaseCounter: 0,
    BreakStatementCounter: 0,
    IfStatementCounter: 0,
    WhileStatementCounter: 0,
    ForStatementCounter: 0,
    ForInStatementCounter: 0,
    AssignmentExpressionCounter: 0,
    UpdateExpressionCounter: 0
}

var massWeight = {
  VARIABLEDECLARATION: 1,
  LITERAL: 1,
  CALLEXPRESSION: 2,
  BINARYEXPRESSION: 2,
  MEMBEREXPRESSION: 3,
  SWITCHSTATEMENT:3,
  SWITCHCASE: 1,
  BREAKSTATEMENT: 1,
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
      name: 'romanNumeralsS1 WHILE',
      code: function () {
        var convert = function (arabic) {
          var map = {
            1: 'I',
            4: 'IV',
            5: 'V',
            9: 'IX',
            10: 'X',
            90: 'XC',
            100: 'C',
            500: 'D'
          };


          if (map.hasOwnProperty(arabic)) {
            return map[arabic]
          }

          var i = 0;
          var steps = [500, 100, 10, 5, 1];
          while (i < steps.length){
            if (arabic > steps[i]) {
              return convert(steps[i]) + convert(arabic - steps[i]);
            }
            ++i;
          }

          return 'XX';
        };
      }
    },
    {
      name: 'romanNumeralsS1 FOR',
      code: function () {
        var convert = function (arabic) {
          var map = {
            1: 'I',
            4: 'IV',
            5: 'V',
            9: 'IX',
            10: 'X',
            90: 'XC',
            100: 'C',
            500: 'D'
          };


          if (map.hasOwnProperty(arabic)) {
            return map[arabic]
          }

          var steps = [500, 100, 10, 5, 1];
          for (var i=0; i<steps.length; i++){
            if (arabic > steps[i]) {
              return convert(steps[i]) + convert(arabic - steps[i]);
            }
          }

          return 'XX';
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
    console.log('TOTAL MASS OF ' + kataSessions.sessions[i].name + ': ', massOfSession);
    console.log('NUMBER OF TRANSFORMATION: ', transformationCounters);
    convertJsonToCsv(transformationCounters, kataSessions.sessions[i].name);
    resetTransormationCounters();
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
  });

  it('for loop with member expression', function () {
    expect(getMass('for (var i=0; i<arr.length; i++){}')).toBe(
        massWeight.FORSTATEMENT + massWeight.VARIABLEDECLARATION + massWeight.LITERAL + massWeight.BINARYEXPRESSION +
        massWeight.MEMBEREXPRESSION + massWeight.UPDATEEXPRESSION
    );
  });

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

  it('switch with 2 cases', function () {
    expect(getMass('switch (expr) {case "Oranges":break;case "Apples":break;default:}'))
        .toBe(
            massWeight.SWITCHSTATEMENT + massWeight.SWITCHCASE + massWeight.LITERAL + massWeight.BREAKSTATEMENT
            + massWeight.SWITCHCASE + massWeight.LITERAL + massWeight.BREAKSTATEMENT + massWeight.SWITCHCASE
        );
  });

  it('switch statement with one case', function () {
    expect(getMass(
    'switch (expr) {case "Oranges": console.log("Oranges are $0.59 a pound.");break;}'
   )).toBe(
            massWeight.SWITCHSTATEMENT + massWeight.SWITCHCASE + massWeight.LITERAL + massWeight.MEMBEREXPRESSION + massWeight.BREAKSTATEMENT
            + massWeight.LITERAL
     );
  });
});