/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import { parseRoute } from './lib';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginpage';
import ProductDetails from './components/productdetails';
import ProductListItem from './components/productlistitem';
import CheckoutForm from './pages/checkout-form';
import CartItem from './components/cart-item';
import priceFormatter from './lib/price-formatter';
import CartSummary from './components/cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ cart: resp });
      });
  }

  addToCart(product) {
    const options = {
      method: 'POST'
    };
    fetch(`./api/cart/${product}`, options)
      .then(resp => resp.json())
      .then(resp => {
        const cartArray = this.state.cart.slice();
        cartArray.push(resp);
        this.setState({ cart: cartArray });
      });
  }

  placeOrder(order) {
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('./api/orders', options)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      });

  }

  setView(name, params) {
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return <Home setView={this.setView}/>;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary setView={this.setView} cartState={this.state.cart}/>;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm placeOrder={this.placeOrder} cartState={this.state.cart}/>;
    } else {
      return <ProductDetails productInfo={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    }
  }

  render() {
    return (
    <div className="ui container">
    <BrowserRouter>
    <div>
      <Route exact path ='/' cartItemCount={this.state.cart.length} setView={this.setView}>
        {this.renderView()}
      </Route>
      <Route exact path='/signupPage'>
        <SignupPage />
      </Route>
      <Route exact path='/loginpage'>
        <LoginPage />
      </Route>
      <Route exact path='/productdetails'>
        <ProductDetails />
      </Route>
      <Route exact path="/productlistitem">
        <ProductListItem />
      </Route>
      <Route exact path='cart-item'>
        <CartItem />
      </Route>
      <Route exact path='cart-summary'>
        <CartSummary />
      </Route>
      <Route exact path='/checkout-form'>
        <CheckoutForm />
      </Route>
    </div>
    </BrowserRouter>
    </div>
    );
  }
}
