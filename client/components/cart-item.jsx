import React from 'react';
import priceFormatter from '../lib/price-formatter';

export default function CartSummaryItem(props) {
  const { imageUrl, name, price, description } = props.cartData;
  return (
  <div className="col-12 card flex-row shadow-sm align-items-center mb-4">
  <img className="col-4 product-details-image p-3" src={imageUrl} alt=""/>
  <div className="col-8 card-body">
    <h3 className="card-title">{name}</h3>
    <p className="card-text">{priceFormatter(price)}</p>
    <p className="card-text">{description}</p>
  </div>
</div>
  );
}
