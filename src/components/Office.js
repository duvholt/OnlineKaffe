import React, { Component } from 'react';
import Coffee from './Coffee';
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
  }

  fetchCoffee() {
    fetch(API_ONLINE)
    .then(data => data.json())
    .then((data) => {
      const { date, pots } = data.coffee;
      this.setState({
        date,
        pots,
        loaded: true,
      });
    });
  }

  render() {
    const { loaded, date, pots } = this.state;
    if (!loaded) {
      return (
        <Loader />
      );
    }
    return (
      <Coffee date={date} pots={pots} />
    );
  }

}

export default Office;
