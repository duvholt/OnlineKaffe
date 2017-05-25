import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './NotificationButton.css';

const NotificationButton = ({ enabled, onClick }) => {
  const notificationClass = classNames(css.container, {
    [css.enabled]: enabled,
  });
  return (
    <div className={notificationClass}>
      Kaffevarsling
      <button onClick={onClick} className={css.button}>
        { enabled ? 'På' : 'Av' }
        <div className={css.slider} />
      </button>
    </div>
  );
};

NotificationButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationButton;
