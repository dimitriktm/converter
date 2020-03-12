import React, { Component } from "react";
import "./convertor.css";

import { ConvertorTable } from "./convertor-table";
import { ConvertorControlls } from "./convertor-controlls";

import { Container } from "semantic-ui-react";
import convert from "convert-units";

/**
 * Controller Class representing a real time table of measurements
 *
 * Real time table of measurements where you can input value and see converted value in all units of table
 */
export class Convertor extends Component {
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
    selectedMeasure: Convertor.DEFAULT_VALUES.measure,
    convertedUnits: Convertor.getConvertedUnits(
      Convertor.DEFAULT_VALUES.measure,
      Convertor.DEFAULT_VALUES.value,
      Convertor.DEFAULT_VALUES.unit
    ),
    selectedUnit: Convertor.DEFAULT_VALUES.unit,
    unitValue: Convertor.DEFAULT_VALUES.value
  };
  /**
   * Set selected measurament
   * and set converted units with default value of default unit
   * */
  onMeasuramentSelect(_, { value }) {
    let selectedMeasure = value;
    let firstUnitInMeasure = convert().list(selectedMeasure)[0].abbr;
    let unitValue = 0;
    let convertedUnits = Convertor.getConvertedUnits(
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
    let convertedUnits = Convertor.getConvertedUnits(
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
          <ConvertorControlls
            selectedMeasure={selectedMeasure}
            selectedUnit={selectedUnit}
            unitValue={unitValue}
            onMeasuramentSelect={this.onMeasuramentSelect.bind(this)}
            onValueChange={this.onValueChange.bind(this)}
            onUnitChange={this.onUnitChange.bind(this)}
            onConvert={this.onConvert.bind(this)}
          />
          <ConvertorTable convertedUnits={convertedUnits} />
        </Container>
      </div>
    );
  }
}
