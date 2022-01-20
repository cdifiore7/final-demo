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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(order);
  }

  render() {
    const message = this.state.message;
    const totalPrice = this.props.cartState.reduce((accumulator, currentValue) => accumulator += currentValue.price, 0);
    return (
      <div className="row" id='checkout-container'>
        <div className="col-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="pb-2">Name</label>
              <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label className="pb-2">Credit Card</label>
              <input className="form-control" type="number" name="creditCard" value={this.state.creditCard} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label className="pb-2">Shipping Address</label>
              <input className="form-control" name="shippingAddress" value={this.state.shippingAddress} onChange={this.handleChange} />
            </div>
            <div className="col-12 d-flex justify-content-between mt-4">
              <h2 className="mt-3" id="item-total">Order Total <span>{priceFormatter(totalPrice)}</span></h2>
              <button className="btn btn-primary" type="submit">Place Order</button>
              <div className="help-block mt-2" id="mt-2"> {message}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
