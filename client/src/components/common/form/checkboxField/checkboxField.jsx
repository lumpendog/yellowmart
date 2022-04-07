import React from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ name, value, onChange, label, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className="checkbox-field">
      <input
        type="checkbox"
        value={value}
        className="checkbox-field__input"
        onChange={handleChange}
        id={name}
      />
      <label htmlFor={name} className="checkbox-field__label">
        {!label ? children : label}
      </label>
      {error && <p className="checkbox-field__message">{error}</p>}
    </div>
  );
};

CheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
};

export default CheckboxField;
