/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import React from 'react';
import priceFormatter from '../lib/price-formatter';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.placeOrder(this.state);
  }

  render() {
    const totalPrice = this.props.cartState.reduce((accumulator, currentValue) => accumulator += currentValue.price, 0);
    return (
      <div className="row">
        <h1 className="col-12 mt-3 mb-4">My Cart</h1>
        <h3 className="col-12 mt-3 mb-5 text-muted">Order Total <span>{priceFormatter(totalPrice)}</span></h3>
        <div className="col-12 ">
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group">
              <label className="pb-2" htmlFor="">Name</label>
              <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label className="pb-2" htmlFor="">Credit Card</label>
              <input className="form-control" type="number" name="creditCard" value={this.state.creditCard} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <label className="pb-2" htmlFor="">Shipping Address</label>
              <textarea className="form-control" rows="5" name="shippingAddress" value={this.state.shippingAddress} onChange={e => this.handleChange(e)}/>
            </div>
            <div className="col-12 d-flex justify-content-between mt-4">
              <button className="btn btn-primary" type="submit">Place Order</button>
            </div>
          </form>
        </div>

      </div>
    );
  }

}
