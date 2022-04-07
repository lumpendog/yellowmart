import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoginStatus, getUserData } from '../../store/auth';

const ProtectedAdminRoute = ({ component: Component, children, ...rest }) => {
  const isLogin = useSelector(getLoginStatus());
  const currentUser = useSelector(getUserData());
  const isAdmin = currentUser?.isAdmin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin && isAdmin) {
          return Component ? <Component {...props} /> : children;
        } else {
          return (
            <p>
              Error: you have no permission for this page. Please contact
              administrator.
            </p>
          );
        }
      }}
    />
  );
};

ProtectedAdminRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedAdminRoute;
