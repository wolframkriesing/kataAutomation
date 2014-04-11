var json2csv = require('json2csv');

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


