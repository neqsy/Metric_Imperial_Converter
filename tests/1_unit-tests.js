const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('Whole number input', function() {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('Decimal input', function() {
    assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('Fractional input', function() {
    assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
  });

  test('Fractional with decimal', function() {
    assert.approximately(convertHandler.getNum('5.4/3kg'), 1.8, 0.01);
  });

  test('Double fraction input should return error', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('No numerical input should default to 1', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('Each valid input unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(unit => {
      assert.strictEqual(convertHandler.getUnit(`10${unit}`), unit);
    });
  });

  test('Invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Return correct return unit for each input', function() {
    const pairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    for (let unit in pairs) {
      assert.strictEqual(convertHandler.getReturnUnit(unit), pairs[unit]);
    }
  });

  test('Return spelled-out string unit for each valid input unit', function() {
    const spellings = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    for (let unit in spellings) {
      assert.strictEqual(convertHandler.spellOutUnit(unit), spellings[unit]);
    }
  });

  test('Convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('Convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
