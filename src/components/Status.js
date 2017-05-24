import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './Status.css';

const Status = ({ open }) => (
  <div
    className={classNames(css.status, {
      [css.open]: open,
    })}
  >
    Kontoret er {open ? 'åpent' : 'stengt'}
  </div>
);

Status.defaultProps = {
  open: false,
};

Status.propTypes = {
  open: PropTypes.bool,
};

export default Status;
