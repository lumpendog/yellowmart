import React, { useEffect, useState } from 'react';
import { storage } from '../../../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUser } from '../../../store/auth';

import history from '../../../utils/history';
import validator from '../../../utils/validator';
import Button from '../../common/button';
import Textfield from '../../common/form/textfield';
import Loader from '../../common/loader';
import { toast } from 'react-toastify';
import FileField from '../../common/form/fileField';

const AccountInfo = () => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const userData = useSelector(getUserData());

  useEffect(() => {
    setData(userData);
    setIsLoading(false);
  }, [userData]);

  const validateConfig = {
    email: {
      isRequired: {
        message: 'Please enter email'
      },
      isEmail: {
        message: 'Please check email'
      }
    },
    firstName: {
      isRequired: {
        message: 'Please enter first name'
      },
      min: {
        message: 'First name should be 3 chars min',
        value: 3
      }
    },
    lastName: {
      isRequired: {
        message: 'Please enter last name'
      },
      min: {
        message: 'Last name should be 3 chars min',
        value: 3
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validateConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleAvatarInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageRef = ref(storage, `/avatars/${userData._id}`);
      await uploadBytes(imageRef, file);
      const avatarURL = await getDownloadURL(imageRef);
      const newUserData = { ...userData, avatarImage: avatarURL };
      dispatch(updateUser(newUserData));
    } catch (e) {
      toast(e.message);
    }
  };

  const handleAdmin = () => {
    history.push('/admin/catalog/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(data));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="account-info-container">
      <h2 className="account-info-container__h2">My Account</h2>
      <div className="personal-settings">
        <div className="personal-settings__avatar-box">
          <img
            src={userData.avatarImage || '/account/avatar_default.png'}
            alt="avatar-image"
            className="personal-settings__avatar-image"
          />
          <FileField
            size="sm"
            label="Change"
            onChange={handleAvatarInputChange}
          />
          {userData.isAdmin && (
            <Button size="sm" content="Admin page" onClick={handleAdmin} />
          )}
        </div>
        <form className="personal-settings__settings" onSubmit={handleSubmit}>
          <Textfield
            name="email"
            value={data.email}
            onChange={handleChange}
            label="Email"
            error={errors.email}
          />
          <Textfield
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            label="First name"
            error={errors.firstName}
          />
          <Textfield
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            label="Last name"
            error={errors.lastName}
          />
          <Textfield
            name="shippingAddress"
            value={data.shippingAddress || ''}
            onChange={handleChange}
            label="Shipping address"
            error={errors.shippingAddress}
          />
          <Textfield
            name="mobilePhoneNumber"
            value={data.mobilePhoneNumber || ''}
            onChange={handleChange}
            label="Mobile phone #"
            error={errors.mobilePhoneNumber}
          />
          <div className="personal-settings__buttons-box">
            <Button
              size="lg"
              content="Save"
              onClick={handleSubmit}
              disabled={!isValid}
            />
            <Button size="lg" content="Cancel" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInfo;
