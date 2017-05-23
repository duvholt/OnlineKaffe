import React, { Component } from 'react';
import moment from 'moment';
import css from './Coffee.css';

const API_ONLINE = 'https://passoa.online.ntnu.no/api/office/online';

class Coffee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };
    this.fetchCoffee();
  }

  fetchCoffee() {
    fetch(API_ONLINE)
    .then(data => data.json())
    .then((data) => {
      const { date, pots } = data.coffee;
      this.setState({
        date, pots,
      });
    });
  }

  render() {
    const { date, pots } = this.state;
    return (
      <div className={css.container}>
        <div className={css.date}>
          { date !== null ?
            `Kaffen ble laget for ${moment(date).fromNow()}`
          :
            'Kaffe har ikke blitt laget i dag'
          }
        </div>
        <div className={css.pots}>{pots} kanner totalt i dag</div>
        <div className={css.icon} />
      </div>
    );
  }
}

export default Coffee;
