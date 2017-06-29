import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.css';
import classNames from 'classnames';

const Button = ({ children, active, ...other }) => (
  <button
    className={classNames(css.button, {
      [css.active]: active,
    })}
    {...other}
  >
    { children }
  </button>
);

Button.defaultProps = {
  active: false,
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Button;
