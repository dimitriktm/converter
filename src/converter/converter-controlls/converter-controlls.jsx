import React from "react";
import { Button, Dropdown, Grid, Input } from "semantic-ui-react";
import convert from "convert-units";

export class ConverterControlls extends React.Component {
  /** getDropdown* is helper methods to get list of value in specific format for dropdown component of semantic ui */
  getDropdownListOfUnits() {
    const { selectedMeasure } = this.props;

    let unitsList = convert().list(selectedMeasure);
    let dropdownUnitsList = [];

    for (let unit of unitsList) {
      dropdownUnitsList.push({
        key: unit.abbr,
        text: unit.plural,
        value: unit.abbr
      });
    }

    return dropdownUnitsList;
  }
  getDropdownMeasuresList() {
    let measuresList = convert().measures();
    let dropdownMeasuresList = [];

    for (let measure of measuresList) {
      dropdownMeasuresList.push({
        key: measure,
        text: measure,
        value: measure
      });
    }

    return dropdownMeasuresList;
  }

  render() {
    const {
      selectedMeasure,
      selectedUnit,
      unitValue,
      onMeasuramentSelect,
      onValueChange,
      onUnitChange,
      onConvert
    } = this.props;
    const unitsList = this.getDropdownListOfUnits();
    const measureList = this.getDropdownMeasuresList();

    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              onChange={onMeasuramentSelect}
              className="purple"
              fluid
              scrolling
              value={selectedMeasure}
              options={measureList}
              button={true}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Input
              label={
                <Dropdown
                  onChange={onUnitChange}
                  className="purple"
                  value={selectedUnit}
                  options={unitsList}
                />
              }
              labelPosition="right"
              placeholder="Value"
              size="mini"
              value={unitValue}
              fluid
              onChange={onValueChange}
              type={"number"}
            />
          </Grid.Column>

          <Grid.Column>
            <Button onClick={onConvert} size="small" className="purple">
              Convert
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
