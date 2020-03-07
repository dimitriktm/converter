export let convert;
/**
* Converts one unit to another
* @param {object} conversionTable - conversion table
* @returns {number}
*/
convert = conversionTable => (_value, unit, unit2) =>
{
	let value;

	value = parseFloat(_value);
	if (unit === unit2) {
		/** quick way to convert scientific notation of exponent | 2e+3 */
		return value * 1;
	}
	else if (unit !== unit2) {
		return value * conversionTable[unit].ratio / conversionTable[unit2].ratio;
	}
	else {
		throw new Error(`
			Could not convert given unit: ${unit} with given value: ${value} to given unit: ${unit2}
		`)
	}
}
