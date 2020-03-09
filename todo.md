UI
	Select table [+]
	Input, Select, button [+]
	Output [+]
Logic
	handleTableSelect []
	handleValueChange []
	handleUnitChange[]
	handleConvertSubmit []
	Connect module with ui []
Module
	Transfer module from repl []
	
	
Data structure	
Factory(name) {
    registered: []
}


Factory = new Factory();
state: {
    selected: 'length'
}
onSubmit() {
    this.Factory()
}
render() {
    return {
        Factory(state.selected).units()
    };
}


How we can render list of avaible tables?
When user selects table how we will reflect it in the dom?

Requirments
User can select measurament table
User can enter value and select unit then convert 
User can see value converted in all units in the table


List of avaible tables must be an array
When table selected, ui must be reflect a selected table such as units of table and table name
Input must change units to units of table
