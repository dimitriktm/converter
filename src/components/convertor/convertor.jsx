import React, {Component, Fragment} from 'react';
import {
	Container,
	Table,
	Input,
	Dropdown,
	Button,
	Grid
} from 'semantic-ui-react'
import './convertor.css';
import convert from 'convert-units'
/**
* Class representing a real time table of measurements
*
* Real time table of measurements where you can input value and see converted value in all units of table
*/
export class Convertor extends Component {
	state = {
		measurament: 'length',
		convertedUnits: [],
		unit: 'mm',
		value: 1
	};
	/** set table of units with default value */
	componentDidMount() {
		const {measurament, unit, value} = this.state;
		const convertedUnits = this.convert(measurament, value, unit);
		this.setState({convertedUnits});
	}

	/**
	 * Get list of converted units
	 * */
	convert(measurament, value, unit) {
		let results,
			unitsList;

		if(!value || !unit)
		{
			return;
		}

		results = new Array();
		unitsList = convert().list(measurament);
		for(let unitItem of unitsList)
		{
			results.push(
				{
					...unitItem,
					value: convert(value).from(unit).to(unitItem.abbr)
				}
			);
		};

		return results;
	}





	/** wrappers around convert plugin to get data in specific format or specific data */
	getDefaultUnit(measurament) {
		return convert().list(measurament)[0].abbr;
	}
	getDropdownListOfUnits() {
		let unitsList,
			dropdownUnitsList;
		const {
			measurament
		} = this.state;

		unitsList = convert().list(measurament);
		dropdownUnitsList = new Array();
		for(let unit of unitsList) {
			dropdownUnitsList.push(
				{
					key: unit.abbr,
					text: unit.plural,
					value: unit.abbr
				}
			);
		}

		return dropdownUnitsList;
	}
	getDropdownMeasuresList() {
		let measuresList,
			dropdownMeasuresList;

		measuresList = convert().measures();
		dropdownMeasuresList = new Array();
		for(let measure of measuresList) {
			dropdownMeasuresList.push(
				{
					key: measure,
					text: measure,
					value: measure
				}
			)
		}

		return dropdownMeasuresList;
	}



	/**
	 * Set selected measurament
	 * and set converted units with default value of default unit
	 * */
	onMeasuramentSelect(event, { value }) {
		let defaultValue,
			defaultUnit,
			convertedUnits;

		defaultValue = 1;
		defaultUnit = this.getDefaultUnit(value);
		convertedUnits = this.convert(value, defaultValue, defaultUnit);

		this.setState({
			measurament: value,
			convertedUnits: convertedUnits,
			unit: defaultUnit,
			value: defaultValue
		});
	}
	/**
	 * Set value to state
	 * */
	// todo highlight input about error that value must be a number
	onValueChange({ target: { value } }) {
		if(isNaN(parseFloat(value))) {
			throw new Error('Value must be an integer');
		}
		this.setState({value});
	}
	/**
	 * Set unit to state
	 * */
	onUnitChange(event, { value }) {
		this.setState({unit: value});
	}
	/**
	 * Convert value
	 * */
	onConvert() {
		let results;

		results = this.convert(this.state.measurament, this.state.value, this.state.unit);

		this.setState({convertedUnits: results,});
	}

	render() {
		const {measurament, convertedUnits} = this.state;
		const unitsList = this.getDropdownListOfUnits();
		const dropdownLabel = <Dropdown onChange={this.onUnitChange.bind(this)} scrolling className='purple' value={this.state.unit} options={unitsList}/>;
		return (
			<div className='wrapper'>
				<Container text>
					<Grid columns='equal'>
						<Grid.Row>
							<Grid.Column>
							<Dropdown onChange={this.onMeasuramentSelect.bind(this)} className='label purple' fluid scrolling value={measurament} options={this.getDropdownMeasuresList()} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Input
									label={dropdownLabel}
									labelPosition='right'
									placeholder='Value'
									size='mini'
									fluid
									onChange={this.onValueChange.bind(this)}
								/>
							</Grid.Column>
							<Grid.Column>
								<Button onClick={this.onConvert.bind(this)} size='small' className='purple'>Convert</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Table definition>
						<Table.Body>
							{convertedUnits.map(({ plural, value }, index) =>
								<Table.Row key={plural + index}>
									<Table.Cell>{ plural }</Table.Cell>
									<Table.Cell>{ value }</Table.Cell>
								</Table.Row>
							)}
						</Table.Body>
					</Table>
				</Container>
			</div>
		);
	}
};


/*
* On Create selects displays default table and units with default value 1
* On table select repeats above
*
*
*
*
*
* */