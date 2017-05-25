import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { socketConnect } from 'socket.io-react';
import Coffee from './Coffee';
import Status from './Status';
import Loader from './Loader';
import NotificationButton from './NotificationButton';
import { API_HOST, API_OFFICE } from '../constants';


const notify = () => {
  if (Notification.permission === 'granted') {
    // New is required
    // eslint-disable-next-line no-new
    new Notification('Nytraktet kaffe på Onlinekontoret!');
  }
  else {
    alert('Kaffevarsling har blitt skrudd på men du har ikke tillatt notifikasjoner i nettleseren');
  }
};

const notifyPermission = () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification('Kaffevarsling er slått på', {
          body: 'Du vil nå få varsler om nytraktet kaffe så lenge vinduet er åpent',
        });
      }
    });
  }
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
        notifications: false,
      });
    });
  }

  newCoffee(data) {
    const { date, pots } = data;
    this.setState({ date, pots });
    if (this.state.notifications) {
      notify();
    }
  }

  newStatus(data) {
    const { status } = data;
    this.setState({ status });
  }

  toggleNotifications() {
    if (!this.state.notifications) {
      notifyPermission();
    }
    this.setState({
      notifications: !this.state.notifications,
    });
  }

  render() {
    const { loaded, date, pots, status, notifications } = this.state;
    if (!loaded) {
      return (
        <Loader />
      );
    }
    return (
      <div>
        <Status open={status} />
        <Coffee date={date} pots={pots} />
        <NotificationButton enabled={notifications} onClick={() => this.toggleNotifications()} />
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
