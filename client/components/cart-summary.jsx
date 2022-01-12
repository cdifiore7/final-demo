/* eslint-disable no-return-assign */
import React from 'react';
import CartSummaryItem from './cart-item';
import priceFormatter from '../lib/price-formatter';

export default function CartSummary(props) {
  const totalPrice = props.cartState.reduce((accumulator, currentValue) => accumulator += currentValue.price, 0);
  return (
      <div className="image-box">
        <h3 className="col-12 mt-3 mb-4" id="my-cart">My Cart</h3>
        <div className="row">
        {props.cartState.map(item => <CartSummaryItem key={item.productId} cartData={item}/>)}
      </div>
        <div className="col-11 d-flex justify-content-between mt-2 mb-2 mr-5">
        <h2 className="mt-3" id="item-total">Item Total <span>{priceFormatter(totalPrice)}</span></h2>
          <button id="checkout-button" className="btn btn-primary" onClick={() => props.setView('checkout', {})}>Proceed to Checkout</button>
        </div>
      </div>
  );
}
