import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ size, content, onClick, disabled, type }) => {
  return (
    <button
      className={'btn btn-' + size}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string
};

export default Button;
