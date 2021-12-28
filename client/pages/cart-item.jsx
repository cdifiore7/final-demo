
import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className="ml-3 mt-2 contain">
      <div className="row d-flex shadow margin mr-4 item-color">
        <img className="col-lg-5 pt-3 pb-3" src={props.imageUrl}></img>
        <div>
          <div>
            <h3 className="ml-2 mb-2 mt-5">{props.name}</h3>
            <h5 className="m-2 mb-2 text-muted">${props.price}</h5>
            <p className="ml-2 mb-5">{props.description}</p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CartSummaryItem;
