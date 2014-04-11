var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');
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

var metrics = {};
metrics[Syntax.VariableDeclaration] = {
  complexity: complexities.VARIABLEDECLARATION,
  qualityMetricCounters: qualityMetricCounters.VariableDeclartationCounter
};
metrics[Syntax.Literal] = {
  complexity: complexities.LITERAL,
  qualityMetricCounters: qualityMetricCounters.LiteralCounter
};
metrics[Syntax.MemberExpression] = {
  complexity: complexities.MEMBEREXPRESSION,
  qualityMetricCounters: qualityMetricCounters.MemberExpressionCounter
};
metrics[Syntax.WhileStatement] = {
  complexity: complexities.WHILESTATEMENT,
  qualityMetricCounters: qualityMetricCounters.WhileStatementCounter
};
metrics[Syntax.ForStatement] = {
  complexity: complexities.FORSTATEMENT,
  qualityMetricCounters: qualityMetricCounters.ForStatementCounter
};
metrics[Syntax.ForInStatement] = {
  complexity: complexities.FORINSTATEMENT,
  qualityMetricCounters: qualityMetricCounters.ForInStatementCounter
};
metrics[Syntax.BinaryExpression] = {
  complexity: complexities.BINARYEXPRESSION,
  qualityMetricCounters: qualityMetricCounters.BinaryExpressionCounter
};
metrics[Syntax.AssignmentExpression] = {
  complexity: complexities.ASSIGNMENTEXPRESSION,
  qualityMetricCounters: qualityMetricCounters.AssignmentExpressionCounter
};
metrics[Syntax.SwitchStatement] = {
  complexity: complexities.SWITCHSTATEMENT,
  qualityMetricCounters: qualityMetricCounters.SwitchStatementCounter
};
metrics[Syntax.SwitchCase] = {
  complexity: complexities.SWITCHCASE,
  qualityMetricCounters: qualityMetricCounters.SwitchCaseCounter
};
metrics[Syntax.BreakStatement] = {
  complexity: complexities.BREAKSTATEMENT,
  qualityMetricCounters: qualityMetricCounters.BreakStatementCounter
};
metrics[Syntax.IfStatement] = {
  complexity: complexities.IFSTATEMENT,
  qualityMetricCounters: qualityMetricCounters.IfStatementCounter
};
metrics[Syntax.UpdateExpression] = {
  complexity: complexities.UPDATEEXPRESSION,
  qualityMetricCounters: qualityMetricCounters.UpdateExpressionCounter
};

function getComplexityOfNode(node) {
  var complexity = 0;
  var nodeType = node.type;
  var nodeToAnalyze = metrics[nodeType];
  if (nodeToAnalyze) {
    complexity = nodeToAnalyze.complexity;
    ++(nodeToAnalyze.qualityMetricCounters);
  }
  if (nodeType == Syntax.CallExpression && (node.callee.type != Syntax.MemberExpression)) {
    complexity = complexities.CALLEXPRESSION;
    ++qualityMetricCounters.CallExpressionCounter;
  }
  return complexity;
}

function getComplexityOfParsedTree(tree) {
  var totalComplexity = 0;
  traverse(tree, function(node) {
    totalComplexity += getComplexityOfNode(node);
  });
  return totalComplexity;
}

function getComplexity(code) {
  var tree = esprima.parse(code);
  return getComplexityOfParsedTree(tree);
}

module.exports = {
  getComplexity: getComplexity,
  complexities: complexities
};
