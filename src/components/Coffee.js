import React, { PropTypes } from 'react';
import moment from 'moment';
import css from './Coffee.css';


const Coffee = ({ date, pots }) => (
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

Coffee.defaultProps = {
  date: null,
  pots: 0,
};

Coffee.propTypes = {
  date: PropTypes.string,
  pots: PropTypes.number,
};

export default Coffee;
