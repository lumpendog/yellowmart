import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AccountPage from '../../pages/accountPage';
import AdminCatalogPage from '../../pages/adminCatalogPage';
import CartPage from '../../pages/cartPage';
import CatalogPage from '../../pages/catalogPage';
import HomePage from '../../pages/homePage';
import InitMockdataPage from '../../pages/initMockdataPage';
import ItemPage from '../../pages/ItemPage';
import LoginPage from '../../pages/loginPage';
import Logout from '../../pages/logoutPage';
import RegisterPage from '../../pages/registerPage';
import ProtectedAdminRoute from './protectedAdminRoute';
import ProtectedRoute from './protectedRoute';

const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/cart" component={CartPage} />
        <ProtectedRoute path="/account" component={AccountPage} />
        <ProtectedAdminRoute
          path="/admin/catalog/:itemId?"
          component={AdminCatalogPage}
        />
        <Route path="/catalog/:itemId" component={ItemPage} />
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/register" component={RegisterPage} />
        <Route path="/auth/logout" component={Logout} />
        <Route path="/init" component={InitMockdataPage} />
        <Route path="/catalog" component={CatalogPage} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default AppRouter;
