import React from 'react';
import Button from '../../common/button';
import { useSelector } from 'react-redux';
import { getShoppingCartTotalData } from '../../../store/cart';
import formatPrice from '../../../utils/formatPrice';
import history from '../../../utils/history';

const CartSummary = () => {
  const { totalQuantity, totalSum } = useSelector(getShoppingCartTotalData());
  const shippingCost = totalQuantity ? totalQuantity * 40 + 25 : 0;

  const handleCheckout = () => {
    // TODO: send data to server, send back # of order, clean shopping cart
    history.push('/');
  };

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__heading">Cart summary</h2>
      <hr className="cart-summary__hr cart-summary__hr_first" />
      <div className="cart-summary__total">
        <span>Subtotal</span>
        <span>{formatPrice(totalSum)}</span>
      </div>
      <div className="cart-summary__total">
        <span>Shipping</span>
        <span>{formatPrice(shippingCost)}</span>
      </div>
      <hr className="cart-summary__hr" />
      <div className="cart-summary__total">
        <span>Total:</span>
        <span>{formatPrice(shippingCost + totalSum)}</span>
      </div>
      <div className="cart-summary__checkout">
        <Button size="lg" content="Checkout" onClick={handleCheckout} />
      </div>
    </div>
  );
};

export default CartSummary;
