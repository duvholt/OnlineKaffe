import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';
import HeatMap from 'highcharts/modules/heatmap';
import moment from 'moment';
import { API_HOST, API_COFFEE } from '../constants';

HeatMap(ReactHighcharts.Highcharts);

const createHighcartConfig = data => ({
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1,
    backgroundColor: 'transparent',
  },
  credits: {
    enabled: false,
  },
  title: {
    style: {
      color: '#6d4626',
      fontWeight: 'bold',
      fontFamily: '"Noto Serif", serif',
    },
    text: 'Kaffe per time per ukedag',
  },
  xAxis: {
    categories: Array.from(new Array(24), (x, i) => i),
    tickLength: 0,
  },
  yAxis: {
    categories: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
    title: null,
  },
  colorAxis: {
    min: 0,
    minColor: '#ebebeb',
    maxColor: '#da6630',
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    formatter: function formatter() {
      const hour = this.series.xAxis.categories[this.point.x];
      const pots = this.point.value;
      const weekday = this.series.yAxis.categories[this.point.y];
      const potText = pots !== null ? `<b>${pots}</b>` : 'Ingen';
      return `${potText} kaffekanner ble laget kl <b>${hour}</b> på <b>${weekday.toLowerCase()}</b>`;
    },
  },
  series: [{
    borderWidth: 3,
    borderColor: '#ffffff',
    data,
  }],
});

const groupPots = pots => (
  pots.reduce((dates, potDate) => {
    const newDates = dates;
    const date = moment(potDate);
    const hour = date.get('hour');
    const weekday = date.weekday();
    if (newDates[hour] !== undefined) {
      if (newDates[hour].weekdays[weekday] !== undefined) {
        newDates[hour].weekdays[weekday] += 1;
      } else {
        newDates[hour].weekdays[weekday] = 1;
      }
    } else {
      newDates[hour] = {
        weekdays: {
          [weekday]: 1,
        },
      };
    }
    return newDates;
  }, {})
);

const highChartData = (potData) => {
  const data = [];
  let started = false;
  for (let hour = 0; hour < 24; hour += 1) {
    if (started || potData[hour] !== undefined) {
      started = true;
      for (let weekday = 0; weekday < 7; weekday += 1) {
        let numberOfPots = null;
        if (potData[hour] !== undefined && potData[hour].weekdays[weekday] !== undefined) {
          numberOfPots = potData[hour].weekdays[weekday];
        }
        data.push([hour, weekday, numberOfPots]);
      }
    }
  }
  return data;
};

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pots: [],
    };
    this.fetch();
  }

  apiUrl() {
    const since = moment().subtract(70, 'days').toISOString();
    const limit = 100000; // silly
    return `${API_HOST}${API_COFFEE}${this.props.name}?since=${since}&limit=${limit}`;
  }

  fetch() {
    fetch(this.apiUrl())
    .then(data => data.json())
    .then((data) => {
      const { pots } = data;
      this.setState({
        pots,
      });
    });
  }

  render() {
    const { pots } = this.state;
    const data = highChartData(groupPots(pots));
    return (
      <div style={{ marginTop: '2rem' }}>
        <ReactHighcharts config={createHighcartConfig(data)} />
      </div>
    );
  }
}

Stats.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Stats;
