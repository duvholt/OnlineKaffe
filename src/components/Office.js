import React, { Component } from 'react';
import Coffee from './Coffee';
import Status from './Status';
import Loader from './Loader';

const API_ONLINE = 'https://passoa.online.ntnu.no/api/office/online';

class Office extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
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
