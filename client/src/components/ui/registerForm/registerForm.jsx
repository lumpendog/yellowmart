import React, { useEffect, useState } from 'react';
import Button from '../../common/button';
import Textfield from '../../common/form/textfield';
import validator from '../../../utils/validator';
import CheckboxField from '../../common/form/checkboxField';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, register } from '../../../store/auth';
import { Redirect } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    license: false
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Please enter email'
      },
      isEmail: {
        message: 'Please check email'
      }
    },
    password: {
      isRequired: {
        message: 'Please enter password'
      },
      isCapitalSymbol: {
        message: 'Password should contain at least one capital symbol'
      },
      isContainDigit: {
        message: 'Password should contain at least one number'
      },
      min: {
        message: 'Password length should be at least 8 symbols',
        value: 8
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
    },
    license: {
      isRequired: {
        message: 'Please accept license agreement'
      }
    }
  };

  const validate = () => {
    const errors = validator(formData, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [formData]);

  useEffect(() => {
    setErrors({});
  }, []);

  const handleChange = ({ name, value }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    dispatch(register(formData));
  };

  const isLogin = useSelector(getLoginStatus());

  if (isLogin) return <Redirect to="/" />;

  return (
    <>
      <form className="register-form" onSubmit={handleSubmit}>
        <Textfield
          name="email"
          value={formData.email}
          type="email"
          onChange={handleChange}
          label="Email"
          error={errors.email}
        />
        <Textfield
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
          label="Password"
          error={errors.password}
        />

        <Textfield
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          label="First Name"
          error={errors.firstName}
        />

        <Textfield
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          label="Last Name"
          error={errors.lastName}
        />

        <CheckboxField
          name="license"
          value={formData.license}
          onChange={handleChange}
          error={errors.license}
        >
          <span>
            I agree with{' '}
            <a href="#">
              EULA (End User License Agreement), Terms of Use, and Privacy
              Policy
            </a>
          </span>
        </CheckboxField>

        <Button
          size="lg"
          content="Register"
          disabled={!isValid}
          type="submit"
        />
      </form>
    </>
  );
};

export default RegisterForm;
