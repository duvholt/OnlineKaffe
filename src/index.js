import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotAppContainer } from 'react-hot-loader';
import moment from 'moment';
import App from './components/App';

moment.lang('nb');

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
