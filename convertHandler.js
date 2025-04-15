function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let numRegex = /^[\d/.]+/;
    let match = input.match(numRegex);

    if (!match) return 1;

    result = match[0];

    if (result.includes('/')) {
      let nums = result.split('/');
      if (nums.length !== 2) return 'invalid number';
      return parseFloat(nums[0]) / parseFloat(nums[1]);
    }

    return parseFloat(result);
  };

  this.getUnit = function(input) {
    let result;
    let unitRegex = /[a-zA-Z]+$/;
    let match = input.match(unitRegex);

    if (!match) return 'invalid unit';

    result = match[0].toLowerCase();
    if (result === 'l') result = 'L';

    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(result)) return 'invalid unit';

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case 'gal': return +(initNum * galToL).toFixed(5);
      case 'L': return +(initNum / galToL).toFixed(5);
      case 'lbs': return +(initNum * lbsToKg).toFixed(5);
      case 'kg': return +(initNum / lbsToKg).toFixed(5);
      case 'mi': return +(initNum * miToKm).toFixed(5);
      case 'km': return +(initNum / miToKm).toFixed(5);
      default: return 'invalid unit';
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };

}

module.exports = ConvertHandler;
