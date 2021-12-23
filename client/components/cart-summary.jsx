import React from 'react';
import CartSummaryItem from './cart-item';

export default function CartSummary(props) {
  return (
    <div className="row">
      <button onClick={() => props.setView('catalog', {})}className="btn">&#8592; Back to Catalog</button>
      <h1 className="col-12 mt-3 mb-4">My Cart</h1>
      <div className="row">
        {props.cartState.map(item => <CartSummaryItem key={item.productId} cartData={item}/>)}
      </div>
      <div className=" col-12 d-flex justify-content-between pb-5">
          <button onClick={() => props.setView('checkout', {})} className="btn btn-primary">Checkout</button>
      </div>
    </div>
  );
}
