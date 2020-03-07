import React from 'react';
import {Tab} from 'semantic-ui-react'
import './App.css';

/* Components */
import {Convertor} from '../components/convertor'

export function App() {
	let panes;
	panes = [
		{menuItem: "Conversion table", render: () => <Tab.Pane><Convertor /></Tab.Pane>},
		{menuItem: "Conversion table 2", render: () => <Tab.Pane>Convertor table</Tab.Pane>}
	]
  	return (
    	<div className="App">
			<Tab panes={panes} />
    	</div>
  	);
}
