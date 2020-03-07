import React, {Component, Fragment} from 'react';
import {length, convertAll} from '../../modules/conversion'

import {Input,Dropdown, Table} from 'semantic-ui-react'
import * as styles from './convertor.module.css';
/**
* Class representing a real time table of measurements
*
* Real time table of measurements where you can input value and see converted value in all units of table
*/
export class Convertor extends Component {
	lengthConvertAll = convertAll(length.metric);
	state = {table: this.lengthConvertAll(1, 'mm')};

	/**
	* @param {number} value - value of unit
	*/
	onChange({target: {value, name}}) {
		const {
			lengthConvertAll
		} = this;
		if(isNaN(parseFloat(value))) {return;}
		this.setState({
			table: lengthConvertAll(value, name)
		});
	}
	render() {
		const {
			table,
			unit
		} = this.state;
		const units = [
			  { key: 'mm', text: 'Milimeters', value: 'mm' },
			  { key: 'cm', text: 'Centimeters', value: 'cm' },
			  { key: 'm', text: 'Meters', value: 'm' },
			  { key: 'km', text: 'Killometers', value: 'km' },
		]
		return (
			<div>
				<Input
					label={<Dropdown defaultValue='mm' options={units} />}
				    labelPosition='right'
				    placeholder='Unit value'
				/>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Unit</Table.HeaderCell>
						<Table.HeaderCell>Value</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{table.map(item => {
						return (
						<Table.Row>
							<Table.Cell>
							<span className={styles.unit}>{item.unit}</span>
							</Table.Cell>
							<Table.Cell>
							<span className={styles.value}>{item.value}</span>
							</Table.Cell>
						</Table.Row>
						)
					})}
				</Table.Body>
			</Table>
			</div>
		);
	}
};
