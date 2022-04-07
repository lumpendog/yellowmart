import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return <h2>Logout Page</h2>;
};

export default Logout;
