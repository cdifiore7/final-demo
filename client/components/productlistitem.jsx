/* eslint-disable no-unused-vars */
import React from 'react';

export default function ProductListItem(props) {
  const { productId, name, price, imageUrl, description } = props.productInfo;
  return (
    <div className="col-md-4 mb-3" onClick={() => props.setView('details', { productId })}>
      <div className="card product-card shadow-sm">
        <img src={imageUrl} className="card-img-top product-image" alt="A product image"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}
