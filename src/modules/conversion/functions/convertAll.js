import {convert} from './'
export let convertAll;


/**
* Converts value to all values in conversion table
*
* @param {object} conversionTable - conversion table
* @returns {<array<object>>} - array of converted units
*/
convertAll = conversionTable => (
    value, unit
) =>
{
	let convertUnitSystem = convert(conversionTable);
    let results;
    results = new Array();
    for (let tableUnit in conversionTable)
    {
        let result;

        result = convertUnitSystem(value, unit, tableUnit);
        results.push({
			unit: tableUnit,
			value: result
		});
    }

    return results;
}
