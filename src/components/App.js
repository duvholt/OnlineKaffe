import React from 'react';
import Coffee from './Coffee';
import css from './App.css';

const App = () => (
  <div className={css.app}>
    <h1 className={css.title}>Kaffe på Onlinekontoret</h1>
    <Coffee />
    <div className={css.credits}>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
);

export default App;
