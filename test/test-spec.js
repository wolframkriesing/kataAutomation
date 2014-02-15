function getMass(){
  return 1;
var estraverse = require('../node_modules/estraverse/estraverse');
var esprima = require('../node_modules/esprima/esprima');
}


describe('test', function() {
  it('test', function(){
    expect(true).toBe(true);
  });

  it('constant', function () {
    expect(getMass('0')).toBe(1);
  });

//  it('declare variable', function () {
//    expect(getMass('var x')).toBe(1);
//  });
//
//  it('variabel and constant', function () { //binding
//    expect(getMass('var x = 0')).toBe(2);
//  });
//
//  it('call function', function () {
//    expect(getMass('count()')).toBe(2);
//  });
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



