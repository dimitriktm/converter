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
const options = [
  { key: '.com', text: '.com', value: '.com' },
  { key: '.net', text: '.net', value: '.net' },
  { key: '.org', text: '.org', value: '.org' },
];
const tableOptions = [
  { key: 'length', text: 'Length', value: 'length' },
  { key: 'time', text: 'Time', value: 'time' },
]
export class Convertor extends Component {
	state = {}
	render() {
		return (
			<div class='wrapper'>
				<Container text>
					<Grid>
						<Grid.Row>
							<Grid.Column>
							<Dropdown className='label' fluid defaultValue='length' options={tableOptions} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={12}>
								<Input
									label={<Dropdown className='purple' defaultValue='.com' options={options} />}
									labelPosition='right'
									placeholder='Value'
									size='mini'
									fluid

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
							<Table.Cell>reset rating</Table.Cell>
							<Table.Cell>None</Table.Cell>
							<Table.Cell>Resets rating to default value</Table.Cell>
						  </Table.Row>
						  <Table.Row>
							<Table.Cell>set rating</Table.Cell>
							<Table.Cell>rating (integer)</Table.Cell>
							<Table.Cell>Sets the current star rating to specified value</Table.Cell>
						  </Table.Row>
						</Table.Body>
					</Table>
				</Container>
			</div>
		);
	}
};
