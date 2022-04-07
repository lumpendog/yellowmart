import React, { useRef } from 'react';
import Button from '../../button';
import PropTypes from 'prop-types';

const FileField = ({ size, label, onChange, type }) => {
  const inputImageRef = useRef();

  const handleUpload = () => {
    inputImageRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        onChange={onChange}
        ref={inputImageRef}
        className="personal-settings__input-avatar"
        accept="image/*"
      />
      <Button size={size} content={label} type={type} onClick={handleUpload} />
    </div>
  );
};

FileField.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default FileField;
