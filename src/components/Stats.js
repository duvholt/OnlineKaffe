import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HeatMap from 'highcharts/modules/heatmap';
import HighchartsExporting from 'highcharts/modules/exporting';
import moment from 'moment';
import { API_HOST, API_COFFEE } from '../constants';

HeatMap(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

const config = {
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
    layout: 'vertical',
    align: 'right',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280,
  },

  tooltip: {
    formatter: function () {
      return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>'
    },
  },

  series: [{
    name: 'Sales per employee',
    borderWidth: 1,
    data: [
      [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [0, 5, 67], [0, 6, 67],
      [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [1, 5, 67], [1, 6, 67],
      [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [2, 5, 67], [2, 6, 67],
      [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [3, 5, 67], [3, 6, 67],
      [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [4, 5, 67], [4, 6, 67],
      [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [5, 5, 67], [5, 6, 67],
      [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [6, 5, 67], [6, 6, 67],
      [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [7, 5, 67], [7, 6, 67],
      [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [8, 5, 67], [8, 6, 67],
      [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91], [9, 5, 67], [9, 6, 67],
      [10, 0, 47], [10, 1, 114], [10, 2, 31], [10, 3, 48], [10, 4, 91], [10, 5, 67], [10, 6, 67],
      [11, 0, 47], [11, 1, 114], [11, 2, 31], [11, 3, 48], [11, 4, 91], [11, 5, 67], [11, 6, 67],
      [12, 0, 47], [12, 1, 114], [12, 2, 31], [12, 3, 48], [12, 4, 91], [12, 5, 67], [12, 6, 67],
      [13, 0, 47], [13, 1, 114], [13, 2, 31], [13, 3, 48], [13, 4, 91], [13, 5, 67], [13, 6, 67],
      [14, 0, 47], [14, 1, 114], [14, 2, 31], [14, 3, 48], [14, 4, 91], [14, 5, 67], [14, 6, 67],
    ],
    dataLabels: {
      enabled: true,
      color: '#000000',
    },
  }],
};

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
    config.series[0].data = data;
    return (
      <div style={{ marginTop: '2rem' }}>
        <ReactHighcharts config={config} />
      </div>
    );
  }
}

export default Stats;
