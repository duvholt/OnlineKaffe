import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import css from './Select.css';

const Select = ({ title, options, onSelect }) => (
  <div className={css.select}>
    <h3 className={css.title}>{ title }</h3>
    { options.map(({ active, name, value }) => (
      <Button key={value} active={active} onClick={() => onSelect(value)}>{name}</Button>
    ))}
  </div>
);

Select.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Select;
