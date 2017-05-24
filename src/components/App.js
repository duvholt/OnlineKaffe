import React from 'react';
import Office from './Office';
import css from './App.css';

const App = () => (
  <div className={css.app}>
    <h1 className={css.title}>Onlinekontoret</h1>
    <Office name="online" />
    <div className={css.credits}>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
);

export default App;
