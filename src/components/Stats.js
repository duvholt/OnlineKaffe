import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HeatMap from 'highcharts/modules/heatmap';
import HighchartsExporting from 'highcharts/modules/exporting';
import moment from 'moment';
import { API_HOST, API_COFFEE } from '../constants';

HeatMap(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

const createHighcartConfig = (data) => ({
  chart: {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80,
    plotBorderWidth: 1,
  },


  title: {
    text: 'Kaffe per time per ukedag',
  },

  xAxis: {
    categories: Array.from(new Array(24), (x, i) => i),
  },

  yAxis: {
    categories: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
    title: null,
  },

  colorAxis: {
    min: 0,
    minColor: '#FFFFFF',
    maxColor: ReactHighcharts.Highcharts.getOptions().colors[3],
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
    borderWidth: 1,
    data,
    dataLabels: {
      enabled: true,
      color: '#000000',
    },
  }],
});

const groupPots = (pots) => {
  return pots.reduce((dates, potDate) => {
    const newDates = dates;
    const date = moment(potDate);
    // const day = date.format('YYYY-MM-DD');
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
  }, {});
};

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
    const since = moment().subtract(1000, 'days').toISOString();
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

export default Stats;
