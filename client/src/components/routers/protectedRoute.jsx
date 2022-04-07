import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoginStatus } from '../../store/auth';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLogin = useSelector(getLoginStatus());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin) {
          return Component ? <Component {...props} /> : children;
        } else {
          return (
            <Redirect
              to={{
                pathname: 'auth/login',
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;
