import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Eye from '../../SVGs/Eye';
import EyeBlocked from '../../SVGs/EyeBlocked';

const Textfield = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  disabled
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="text-field">
      <label htmlFor={name} className="text-field__label">
        {label}
      </label>
      <div className="text-field__group">
        <input
          name={name}
          id={name}
          type={showPassword ? 'text' : type}
          value={value}
          className={
            'text-field__input' + (error ? ' text-field__input--invalid' : '')
          }
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />

        {type === 'password' && (
          <button
            className="text-field__btn"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? <Eye /> : <EyeBlocked />}
          </button>
        )}
      </div>
      {error && <p className="text-field__message">{error}</p>}
    </div>
  );
};
Textfield.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false
};
Textfield.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

export default Textfield;
