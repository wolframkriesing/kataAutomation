var kataSessions = {
  sessions: [
    {
      name: 'romanNumerals',
      code: function () {
        var arabicDigits = [10, 5, 1];
        var romanDigits = ['X', 'V', 'I'];

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

function getComplexityOfSessions() {
  var entireString;
  var functionBodyString;
  var complexityOfSession;

  for (var i = 0; i < kataSessions.sessions.length; i++) {
    //extracts only the content between code: function () {}
    entireString = kataSessions.sessions[i].code.toString();
    functionBodyString = entireString.substring(entireString.indexOf("{") + 1, entireString.lastIndexOf("}"));

    complexityOfSession = getComplexity(functionBodyString);
    kataSessions.sessions[i].complexityOfSession = complexityOfSession;

    convertJsonToCsv(qualityMetricCounters, kataSessions.sessions[i].name);
    resetQualityMetricCounters();
  }
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

