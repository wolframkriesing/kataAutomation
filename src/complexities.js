var complexities = {
  VARIABLEDECLARATION: 1,
  LITERAL: 1,
  CALLEXPRESSION: 2,
  BINARYEXPRESSION: 2,
  UPDATEEXPRESSION: 2,
  MEMBEREXPRESSION: 3,
  SWITCHSTATEMENT: 3,
  SWITCHCASE: 1,
  BREAKSTATEMENT: 1,
  IFSTATEMENT: 4,
  WHILESTATEMENT: 5,
  FORSTATEMENT: 5,
  FORINSTATEMENT: 5,
  ASSIGNMENTEXPRESSION: 6
};

module.exports = complexities;