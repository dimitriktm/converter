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
   * Cause this functionality needed in multiply places
   * such as when component mounts, on measure change and on convert event.
   * This functionality was isolated in static function so it can be called from
   * any context without sideffects.
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
    measurament: Convertor.DEFAULT_VALUES.measure,
    convertedUnits: Convertor.getConvertedUnits(
      Convertor.DEFAULT_VALUES.measure,
      Convertor.DEFAULT_VALUES.value,
      Convertor.DEFAULT_VALUES.unit
    ),
    unit: Convertor.DEFAULT_VALUES.unit,
    value: Convertor.DEFAULT_VALUES.value
  };
  /**
   * Set selected measurament
   * and set converted units with default value of default unit
   * */
  onMeasuramentSelect(_, { value }) {
    let selectedMeasure = value;
    let unit = convert().list(selectedMeasure)[0].abbr;
    let unitValue = 0;
    let convertedUnits = Convertor.getConvertedUnits(
      selectedMeasure,
      unitValue,
      unit
    );

    this.setState({
      measurament: selectedMeasure,
      convertedUnits: convertedUnits,
      unit,
      value: unitValue
    });
  }

  /**
   * Set value to state
   * */
  onValueChange({ target: { value } }) {
    if (isNaN(parseFloat(value))) {
      throw new Error("Value must be an integer");
    }
    this.setState({ value });
  }

  /**
   * Set unit to state
   * */
  onUnitChange(_, { value }) {
    this.setState({ unit: value });
  }

  /**
   * Convert value
   * */
  onConvert() {
    let results = Convertor.getConvertedUnits(
      this.state.measurament,
      this.state.value,
      this.state.unit
    );
    this.setState({ convertedUnits: results });
  }

  render() {
    const { measurament, convertedUnits } = this.state;
    return (
      <div className="wrapper">
        <Container text>
          <ConvertorControlls
            measurament={measurament}
            onMeasuramentSelect={this.onMeasuramentSelect.bind(this)}
            onValueChange={this.onValueChange.bind(this)}
            onUnitChange={this.onUnitChange.bind(this)}
            onConvert={this.onConvert.bind(this)}
            selectedUnit={this.state.unit}
          />
          <ConvertorTable convertedUnits={convertedUnits} />
        </Container>
      </div>
    );
  }
}
