import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  name,
  options,
  defaultOption,
  onChange,
  error,
  label,
  value
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const renderSelectClasses = () => {
    return (
      'select-field__select' + (error ? ' select-field__select--invalid' : '')
    );
  };

  let optionsArray = [];
  if (!Array.isArray(options) && typeof options === 'object') {
    optionsArray = Object.keys(options).map((optionName) => ({
      name: options[optionName].name,
      value: options[optionName]._id
    }));
  }
  if (Array.isArray(options)) {
    optionsArray = options.map((option) => ({
      name: option.name,
      value: option._id
    }));
  }

  return (
    <div className="select-field">
      <label htmlFor={name} className="select-field__label">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className={renderSelectClasses()}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((o) => (
            <option key={o.value} value={o.value}>
              {o.name}
            </option>
          ))}
      </select>
      {error && <p className="select-field__message">{error}</p>}
    </div>
  );
};

SelectField.defaultProps = {
  defaultOption: 'Select...'
};

SelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  defaultOption: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
};

export default SelectField;
