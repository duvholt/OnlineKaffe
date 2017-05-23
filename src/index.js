import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotAppContainer } from 'react-hot-loader';
import moment from 'moment';
import App from './components/App';

moment.locale('nb');

const render = (Root) => {
  ReactDOM.render(
    <HotAppContainer>
      <Root />
    </HotAppContainer>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

if (Notification.permission === 'default') {
  Notification.requestPermission((permission) => {
    if (permission === 'granted') {
      new Notification('Kaffevarsling er slått på', {
        body: 'Du vil nå få varsler om nytraktet kaffe så lenge vinduet er åpent',
      });
    }
  });
}
