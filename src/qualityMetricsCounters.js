var qualityMetricCounters = {
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
};

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

module.exports = qualityMetricCounters;
