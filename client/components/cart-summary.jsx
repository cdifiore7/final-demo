import React from 'react';
import CartSummaryItem from './cart-item';

function CartSummary(props) {
  let newSummary = 0;
  for (let i = 0; i < props.summaryPrice.length; i++) {
    newSummary += props.summaryPrice[i].price;
  }
  return (
    <>
      <div className="image-box">
        <h3 className="col-11 ml-5" id="my-cart">My Cart</h3>
        {props.cartItem.map(item => {
          return (
            <CartSummaryItem
            key={item.productId}
            image={item.imageUrl}
            name={item.name}
            price={item.price / 100}
            description={item.description}
            />
          );
        })}
        <div className="col-11 d-flex justify-content-between mt-2 mb-2 mr-5">
          <h4 className="ml-4" id="item-total">Item Total ${newSummary / 100}</h4>
          <button id="checkout-button" className="btn btn-primary" onClick={() => props.setView('checkout', {})}>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartSummary;
