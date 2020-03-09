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
/**
* Class representing a real time table of measurements
*
* Real time table of measurements where you can input value and see converted value in all units of table
*/
export class Convertor extends Component {
	state = {selectedTable: 'length'};
	tablesDropdown = [
		{key: 'length', text: 'Length', value: 'length'},
		{key: 'time', text: 'Time', value: 'time'}
	];
	tables = {
		length: {
			getListOfUnits: function() {
				return [
					{abbr: 'mm', fullName: 'Milimeters'},
					{abbr: 'cm', fullName: 'Centimeters'},
					{abbr: 'km', fullName: 'KiloMeters'}
				]
			}
		},
		time: {
			getListOfUnits: function() {
				return [
					{abbr: 's', fullName: 'Seconds'},
					{abbr: 'm', fullName: 'Minutes'},
					{abbr: 'h', fullName: 'Hours'}
				]
			}
		}
	}

	getListOfUnits() {
		const {selectedTable} = this.state;
		const {tables} = this;


		let listOfUnits = new Array();

		tables[selectedTable].getListOfUnits().forEach(unit => {
			listOfUnits.push(
				{
					key: unit.abbr,
					text: unit.fullName,
					value: unit.abbr
				}
			)
		})

		return listOfUnits;
	}

	onTableSelect(event, { value }) {
		this.setState({
			selectedTable: value
		});
	}
	onValueChange({ target: { value } }) {}
	render() {
		const {
			tablesDropdown
		} = this;
		const {
			selectedTable
		} = this.state;

		const listOfUnits = this.getListOfUnits();
		const defaultValue = listOfUnits[1].value;
		const dropdownLabel = <Dropdown className='purple' defaultValue={defaultValue} options={listOfUnits} />;
		return (
			<div className='wrapper'>
				<Container text>
					<Grid columns='equal'>
						<Grid.Row>
							<Grid.Column>
							<Dropdown onChange={this.onTableSelect.bind(this)} className='label purple' fluid defaultValue={selectedTable} options={tablesDropdown} />
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
								<Button size='small' className='purple'>Convert</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Table definition>
						<Table.Body>
						  <Table.Row>
							<Table.Cell>Millimeters</Table.Cell>
							<Table.Cell>300</Table.Cell>
						  </Table.Row>
						  <Table.Row>
							<Table.Cell>Kilometers</Table.Cell>
							<Table.Cell>200</Table.Cell>
						  </Table.Row>
						</Table.Body>
					</Table>
				</Container>
			</div>
		);
	}
};
