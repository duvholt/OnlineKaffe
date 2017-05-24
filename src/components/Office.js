import React, { Component, PropTypes } from 'react';
import { socketConnect } from 'socket.io-react';
import Coffee from './Coffee';
import Status from './Status';
import Loader from './Loader';
import { API_HOST, API_OFFICE } from '../constants';


const notify = () => {
  // New is required
  // eslint-disable-next-line no-new
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
    props.socket.emit('subscribe', props.name);
    props.socket.on('coffee', this.newCoffee.bind(this));
    props.socket.on('status', this.newStatus.bind(this));
  }

  apiUrl() {
    return API_HOST + API_OFFICE + this.props.name;
  }

  fetchCoffee() {
    fetch(this.apiUrl())
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

  newCoffee(data) {
    const { date, pots } = data;
    this.setState({ date, pots });
    notify();
  }

  newStatus(data) {
    const { status } = data;
    this.setState({ status });
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

Office.propTypes = {
  name: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default socketConnect(Office);
