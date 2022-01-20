import React from 'react';
import priceFormatter from '../lib/price-formatter';

export default function CartSummaryItem(props) {
  const { imageUrl, name, price, description } = props.cartData;
  return (
  <div className="col-10 card flex-row shadow-sm align-items-left mb-4">
  <img className="col-2 product-details-image p-3" src={imageUrl} alt=""/>
  <div className="col-2 card-body">
    <h3 className="card-title">{name}</h3>
    <p className="card-text">{priceFormatter(price)}</p>
    <p className="card-text">{description}</p>
  </div>
</div>
  );
}
