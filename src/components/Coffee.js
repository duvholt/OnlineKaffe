import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import css from './Coffee.css';


class Coffee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSince: moment(props.date).fromNow(),
    };

    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({
      timeSince: moment(this.props.date).fromNow(),
    });
  }

  render() {
    const { date, pots } = this.props;
    const { timeSince } = this.state;
    return (
      <div className={css.container}>
        <div className={css.date} title={date}>
          { date !== null ?
            `Kaffen ble laget for ${timeSince}`
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

Coffee.defaultProps = {
  date: null,
  pots: 0,
};

Coffee.propTypes = {
  date: PropTypes.string,
  pots: PropTypes.number,
};

export default Coffee;
