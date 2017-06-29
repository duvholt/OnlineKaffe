import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import HeatmapChart from './HeatmapChart';
import css from './index.css';

class CoffeeHeatmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        { name: 'Siste uke', value: 7, active: true },
        { name: 'Siste måned', value: 30, active: false },
        { name: 'Siste år', value: 365, active: false },
        { name: 'Alt', value: 1000000, active: false },
      ],
      selectedValue: 7,
    };
  }

  onSelect(value) {
    this.setState({
      options: this.state.options.map(option => (
        {
          ...option,
          active: value === option.value,
        }
      )),
      selectedValue: value,
    });
  }

  render() {
    const { name } = this.props;
    const { options, selectedValue } = this.state;
    return (
      <div>
        <h2 className={css.title}>Kaffevarmekart</h2>
        <HeatmapChart name={name} days={selectedValue} />
        <Select
          options={options}
          title="Tidsperiode:"
          onSelect={value => this.onSelect(value)}
        />
      </div>
    );
  }
}

CoffeeHeatmap.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CoffeeHeatmap;
