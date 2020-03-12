import React, { Component } from "react";
import "./converter.css";

import { ConverterTable } from "./converter-table";
import { ConverterControlls } from "./converter-controlls";

import { Container } from "semantic-ui-react";
import convert from "convert-units";

/**
 * Controller Class representing a real time table of measurements
 *
 * Real time table of measurements where you can input value and see converted value in all units of table
 */
export class Converter extends Component {
  /**
   * Convert from given unit to all units in measure
   *
   * @param {string} measure - measure(length, mass, time, etc...)
   * @param {string or number} value - value of selected unit
   * @param {string} unit - unit to convert from
   * @returns {array} array of converted units
   * */
  static getConvertedUnits = function(measurament, value, unit) {
    if (isNaN(parseFloat(value)) || !unit) {
      return false;
    }

    let results = [];
    let unitsList = convert().list(measurament);
    for (let unitItem of unitsList) {
      results.push({
        ...unitItem,
        value: convert(value)
          .from(unit)
          .to(unitItem.abbr)
      });
    }
    return results;
  };
  static DEFAULT_VALUES = {
    measure: "length",
    unit: "mm",
    value: 0
  };

  state = {
    selectedMeasure: Converter.DEFAULT_VALUES.measure,
    convertedUnits: Converter.getConvertedUnits(
      Converter.DEFAULT_VALUES.measure,
      Converter.DEFAULT_VALUES.value,
      Converter.DEFAULT_VALUES.unit
    ),
    selectedUnit: Converter.DEFAULT_VALUES.unit,
    unitValue: Converter.DEFAULT_VALUES.value
  };
  /**
   * Set selected measurament
   * and set converted units with default value of default unit
   * */
  onMeasuramentSelect(_, { value }) {
    let selectedMeasure = value;
    let firstUnitInMeasure = convert().list(selectedMeasure)[0].abbr;
    let unitValue = 0;
    let convertedUnits = Converter.getConvertedUnits(
      selectedMeasure,
      unitValue,
      firstUnitInMeasure
    );

    this.setState({
      selectedMeasure,
      selectedUnit: firstUnitInMeasure,
      unitValue,
      convertedUnits
    });
  }

  /**
   * Handle unit value input
   * */
  onValueChange({ target: { value } }) {
    this.setState({ unitValue: value });
  }

  /**
   * Handle unit select
   * */
  onUnitChange(_, { value }) {
    this.setState({ selectedUnit: value });
  }

  /**
   * Handle convert click
   * */
  onConvert() {
    const { selectedMeasure, selectedUnit, unitValue } = this.state;
    let convertedUnits = Converter.getConvertedUnits(
      selectedMeasure,
      unitValue || 0,
      selectedUnit
    );
    this.setState({ convertedUnits });
  }

  render() {
    const {
      selectedMeasure,
      selectedUnit,
      unitValue,
      convertedUnits
    } = this.state;
    return (
      <div className="wrapper">
        <Container text>
          <ConverterControlls
            selectedMeasure={selectedMeasure}
            selectedUnit={selectedUnit}
            unitValue={unitValue}
            onMeasuramentSelect={this.onMeasuramentSelect.bind(this)}
            onValueChange={this.onValueChange.bind(this)}
            onUnitChange={this.onUnitChange.bind(this)}
            onConvert={this.onConvert.bind(this)}
          />
          <ConverterTable convertedUnits={convertedUnits} />
        </Container>
      </div>
    );
  }
}
