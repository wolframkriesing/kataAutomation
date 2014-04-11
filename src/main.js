var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');
var json2csv = require('json2csv');
var fs = require('fs');

var complexities = require('./complexities');
var qualityMetricCounters = require('./qualityMetricsCounters');

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

function getComplexity(code) {
  var totalComplexity = 0;
  var tree = esprima.parse(code);

  traverse(tree, function (node, parents) {
    if (node.type == Syntax.VariableDeclaration) {
      totalComplexity += complexities.VARIABLEDECLARATION;
      ++(qualityMetricCounters.VariableDeclartationCounter);
    }
    if (node.type == Syntax.Literal) {
      totalComplexity += complexities.LITERAL;
      ++qualityMetricCounters.LiteralCounter;
    }
    if (node.type == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
      totalComplexity += complexities.CALLEXPRESSION;
      ++qualityMetricCounters.CallExpressionCounter;
    }
    if (node.type == Syntax.MemberExpression) {
      totalComplexity += complexities.MEMBEREXPRESSION;
      ++qualityMetricCounters.MemberExpressionCounter;
    }
    if (node.type == Syntax.WhileStatement) {
      totalComplexity += complexities.WHILESTATEMENT;
      ++qualityMetricCounters.WhileStatementCounter;
    }
    if (node.type == Syntax.ForStatement) {
      totalComplexity += complexities.FORSTATEMENT;
      ++qualityMetricCounters.ForStatementCounter;
    }
    if (node.type == Syntax.ForInStatement) {
      totalComplexity += complexities.FORINSTATEMENT;
      ++qualityMetricCounters.ForInStatementCounter;
    }
    if (node.type == Syntax.BinaryExpression) {
      totalComplexity += complexities.BINARYEXPRESSION;
      ++qualityMetricCounters.BinaryExpressionCounter;
    }
    if (node.type == Syntax.AssignmentExpression) {
      totalComplexity += complexities.ASSIGNMENTEXPRESSION;
      ++qualityMetricCounters.AssignmentExpressionCounter;
    }
    if (node.type == Syntax.SwitchStatement) {
      totalComplexity += complexities.SWITCHSTATEMENT;
      ++qualityMetricCounters.SwitchStatementCounter;
    }
    if (node.type == Syntax.SwitchCase) {
      totalComplexity += complexities.SWITCHCASE;
      ++qualityMetricCounters.SwitchCaseCounter;
    }
    if (node.type == Syntax.BreakStatement) {
      totalComplexity += complexities.BREAKSTATEMENT;
      ++qualityMetricCounters.BreakStatementCounter;
    }
    if (node.type == Syntax.IfStatement) {
      totalComplexity += complexities.IFSTATEMENT;
      ++qualityMetricCounters.IfStatementCounter;
    }
    if (node.type == Syntax.UpdateExpression) {
      totalComplexity += complexities.UPDATEEXPRESSION;
      ++qualityMetricCounters.UpdateExpressionCounter;
    }
  });
  return totalComplexity;
}

function resetQualityMetricCounters() {
  qualityMetricCounters.VariableDeclartationCounter = 0,
      qualityMetricCounters.LiteralCounter = 0,
      qualityMetricCounters.CallExpressionCounter = 0,
      qualityMetricCounters.BinaryExpressionCounter = 0,
      qualityMetricCounters.MemberExpressionCounter = 0,
      qualityMetricCounters.SwitchStatementCounter = 0,
      qualityMetricCounters.SwitchCaseCounter = 0,
      qualityMetricCounters.BreakStatementCounter = 0,
      qualityMetricCounters.IfStatementCounter = 0,
      qualityMetricCounters.WhileStatementCounter = 0,
      qualityMetricCounters.ForStatementCounter = 0,
      qualityMetricCounters.ForInStatementCounter = 0,
      qualityMetricCounters.AssignmentExpressionCounter = 0,
      qualityMetricCounters.UpdateExpressionCounter = 0
}

module.exports = {
  getComplexity: getComplexity,
  complexities: complexities
};
