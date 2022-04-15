import React from 'react';
import Button from '../../common/button';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearShoppingCart,
  getShoppingCartTotalData
} from '../../../store/cart';
import formatPrice from '../../../utils/formatPrice';
import history from '../../../utils/history';

const CartSummary = () => {
  const { totalQuantity, totalSum } = useSelector(getShoppingCartTotalData());
  const dispatch = useDispatch();
  const shippingCost = totalQuantity ? totalQuantity * 40 + 25 : 0;

  const handleCheckout = () => {
    dispatch(clearShoppingCart());
    toast.success('Your order has been send');
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
