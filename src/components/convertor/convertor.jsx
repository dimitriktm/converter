import React, {Component} from 'react';
import './convertor.css';
// App components
import {ConvertorTable} from "./convertor-table";
import {ConvertorControlls} from "./convertor-controlls";
// Semantic Ui components
import {Container} from 'semantic-ui-react'
// Plugins
import convert from 'convert-units'


/**
 * Controller Class representing a real time table of measurements
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

        if (!value || !unit) {
            return;
        }

        results = new Array();
        unitsList = convert().list(measurament);
        for (let unitItem of unitsList) {
            results.push(
                {
                    ...unitItem,
                    value: convert(value).from(unit).to(unitItem.abbr)
                }
            );
        }
        ;

        return results;
    }

    getDefaultUnit(measurament) {
        return convert().list(measurament)[0].abbr;
    }

    /**
     * Set selected measurament
     * and set converted units with default value of default unit
     * */
    onMeasuramentSelect(event, {value}) {
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
    onValueChange({target: {value}}) {
        if (isNaN(parseFloat(value))) {
            throw new Error('Value must be an integer');
        }
        this.setState({value});
    }

    /**
     * Set unit to state
     * */
    onUnitChange(event, {value}) {
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
        return (
            <div className='wrapper'>
                <Container text>
                    <ConvertorControlls measurament={measurament}
                                        onMeasuramentSelect={this.onMeasuramentSelect.bind(this)}
                                        onValueChange={this.onValueChange.bind(this)}
                                        onUnitChange={this.onUnitChange.bind(this)}
                                        onConvert={this.onConvert.bind(this)}
                                        selectedUnit={this.state.unit}
                    />
                    <ConvertorTable convertedUnits={convertedUnits}/>
                </Container>
            </div>
        );
    }
};

