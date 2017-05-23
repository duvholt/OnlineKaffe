import React, { Component } from 'react';
import Coffee from './Coffee';
import Status from './Status';
import Loader from './Loader';

const API_ONLINE = 'https://passoa.online.ntnu.no/api/office/online';



const notify = () => {
  new Notification('Nytraktet kaffe på Onlinekontoret!');
};

class Office extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      pots: null,
      status: null,
      loaded: false,
    };
    this.fetchCoffee();
    setInterval(this.fetchCoffee.bind(this), 60 * 1000);
  }

  fetchCoffee() {
    fetch(API_ONLINE)
    .then(data => data.json())
    .then((data) => {
      const { date, pots } = data.coffee;
      const { status } = data.status;
      if (this.state.loaded && pots > this.state.pots) {
        notify();
      }
      this.setState({
        date,
        pots,
        status,
        loaded: true,
      });
    });
  }

  render() {
    const { loaded, date, pots, status } = this.state;
    if (!loaded) {
      return (
        <Loader />
      );
    }
    return (
      <div>
        <Status open={status} />
        <Coffee date={date} pots={pots} />
      </div>
    );
  }

}

export default Office;
