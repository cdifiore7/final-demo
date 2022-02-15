import React from 'react';
import priceFormatter from '../lib/price-formatter';

function CartSummaryItem(props) {
  function handleDelete() {
    props.removeFromCart(props.item.cartItemId);
  }

  return (
    <div className="col-10 card flex-row shadow-sm align-items-left mb-4">
    <img className="col-2 product-details-image p-3" src={props.item.imageUrl} alt=""/>
    <div className="col-2 card-body">
      <h3 className="card-title">{props.item.name}</h3>
      <p className="card-text">{priceFormatter(props.item.price)}</p>
      <p className="card-text">{props.item.description}</p>
      <h5 className="card-title d-flex justify-content-between align-items-center"><button onClick={handleDelete} className="btn btn-danger ml-4">x</button></h5>
      </div>
      </div>
  );
}

export default CartSummaryItem;
