import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotAppContainer } from 'react-hot-loader';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import moment from 'moment';
import App from './components/App';
import { API_HOST } from './constants';

moment.locale('nb');

const socket = io.connect(API_HOST);

const render = (Root) => {
  ReactDOM.render(
    <HotAppContainer>
      <SocketProvider socket={socket}>
        <Root />
      </SocketProvider>
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
