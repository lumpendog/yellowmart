import React from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ name, value, onIncrement, onDecrement, size }) => {
  return (
    <div className={'input-number btn_' + size}>
      <div className="input-number__minus" onClick={onDecrement}>
        -
      </div>
      <input
        type="text"
        name={name}
        id={name}
        className="input-number__input"
        value={value}
        disabled
      />
      <div className="input-number__plus" onClick={onIncrement}>
        +
      </div>
    </div>
  );
};

InputNumber.defaultProps = {
  size: 'sm'
};
InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  size: PropTypes.string
};

export default InputNumber;
