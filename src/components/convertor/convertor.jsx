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
	state = {selectedTable: '', table: [], unit: '', value: 1};

	/** data */
	getListOfUnits() {
		return convert().list(this.state.selectedTable);
	}
	getListOfMeasures() {}
	getDropdownListOfUnits() {
		let unitsList,
			dropdownUnitsList;

		unitsList = convert().list(this.state.selectedTable);
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
	/* Handlers */

	/**
	* when user selects table we change measurement table and set unit to first
	* unit in measurament table
	*/
	onTableSelect(event, { value }) {
		this.setState({
			selectedTable: value,
			unit: convert().list(value)[0].abbr
		});
	}
	onValueChange({ target: { value } }) {
		this.setState(
			{
				value: value
			}
		)
	}
	onUnitChange(event, { value }) {
		this.setState(
			{
				unit: value
			}
		)
	}
	onConvert() {
		let results;

		results = this.convertValue(this.state.value, this.state.unit)
		this.setState(
			{
				table: results
			}
		)
	}
	convertValue(value, unit) {
		if(!value || !unit) {return false;}
		let results,
			unitsList;

		results = new Array();
		unitsList = this.getListOfUnits();

		for(let unit of unitsList)
		{
			results.push(
				{
					value: convert(this.state.value).from(this.state.unit).to(unit.abbr),
					...unit
				}
			)
		};

		return results;
	}
	componentDidMount() {
		let defaultUnit,
			defaultValue,
			defaultSelectedTable,
			defaultTable;

		defaultUnit = 'mm';
		defaultValue = 1;
		defaultSelectedTable = 'length';
		defaultTable = this.convertValue(defaultValue, defaultUnit);

		this.setState({
			selectedTable: defaultSelectedTable,
			table: defaultTable,
			unit: defaultUnit,
			value: defaultValue
		});

	}
	render() {
		const {
			tablesDropdown
		} = this;
		const {
			selectedTable
		} = this.state;
		const unitsList = this.getDropdownListOfUnits();
		const dropdownLabel = <Dropdown onChange={this.onUnitChange.bind(this)} scrolling className='purple' value={this.state.unit} options={unitsList}/>;
		return (
			<div className='wrapper'>
				<Container text>
					<Grid columns='equal'>
						<Grid.Row>
							<Grid.Column>
							<Dropdown onChange={this.onTableSelect.bind(this)} className='label purple' fluid scrolling value={selectedTable} options={this.getDropdownMeasuresList()} />
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

							{this.state.table.map(({ plural, value }) =>
								<Table.Row key={plural}>
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
