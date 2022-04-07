import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/common/logo/logo';
import HeadLink from '../../components/ui/headLink';
import UserSvg from '../../components/common/SVGs/UserSvg';
import ShoppingCartSvg from '../../components/common/SVGs/ShoppingCartSvg';
import { useSelector } from 'react-redux';
import { getLoginStatus, getUserData } from '../../store/auth';
import { getShoppingCartTotalData } from '../../store/cart';
import formatPrice from '../../utils/formatPrice';

const ContentMyAccount = () => {
  const isLogin = useSelector(getLoginStatus());
  const userData = useSelector(getUserData());

  return (
    <>
      {isLogin ? (
        <Link to="/account" className="head-link__content--link">
          {userData?.firstName}
        </Link>
      ) : (
        <Link to="/auth/register" className="head-link__content--link">
          Register
        </Link>
      )}
      {' | '}
      {isLogin ? (
        <Link to="/auth/logout" className="head-link__content--link">
          Logout
        </Link>
      ) : (
        <Link to="/auth/login" className="head-link__content--link">
          Login
        </Link>
      )}
    </>
  );
};

const ContentMyCart = () => {
  const shoppingCartTotalData = useSelector(getShoppingCartTotalData());

  return (
    <Link to="/cart" className="head-link__content--link">
      {shoppingCartTotalData.totalQuantity} items{' '}
      {formatPrice(shoppingCartTotalData.totalSum)}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="header">
      <Logo />

      <div className="links-box">
        <HeadLink
          svg={<UserSvg />}
          header={'My Account'}
          content={<ContentMyAccount />}
        />
        <HeadLink
          svg={<ShoppingCartSvg />}
          header={'My Cart'}
          content={<ContentMyCart />}
        />
      </div>
    </header>
  );
};

export default Header;
