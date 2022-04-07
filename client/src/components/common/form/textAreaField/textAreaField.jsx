import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const renderInputClasses = () => {
    return (
      'text-area-field__textarea' +
      (error ? ' text-area-field__textarea--invalid' : '')
    );
  };

  return (
    <div className="text-area-field">
      <label htmlFor={name} className="text-area-field__label">
        {label}
      </label>
      <textarea
        id={name}
        value={value || ''}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className={renderInputClasses()}
        rows={rows}
      />
      {error && <p className="text-area-field__message">{error}</p>}
    </div>
  );
};

TextAreaField.defaultProps = {
  placeholder: '',
  rows: 3
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number
};

export default TextAreaField;
