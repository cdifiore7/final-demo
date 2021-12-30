/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginpage';
import ProductDetails from './components/productdetails';
import ProductListItem from './components/productlistitem';
import CheckoutForm from './pages/checkout-form';
import CartSummary from './components/cart-summary';
import Header from './pages/header';
import CartSummaryItem from './components/cart-item';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json(res))
      .then(receivedItems => {
        this.setState({ cart: receivedItems });
      })
      .catch(error => console.error(error));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(addedItem => {
        const newItem = this.state.cart.slice();
        newItem.push(addedItem);
        this.setState({ cart: newItem });
      }).catch(error => console.error(error));
  }

  placeOrder(formData) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(result => {
      this.setState({
        view: { name: 'catalog', params: {} },
        cart: []
      });
    }).catch(error => console.error(error));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return <Home setView={this.setView}/>;
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
      <Header items={this.state.cart.length} />
      <CartSummary setView={this.setView} cartItem={this.state.cart} summaryPrice={this.state.cart}/>;
      </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cartItem={this.state.cart} totalPrice={this.state.cart}/>;
    } else {
      return <ProductDetails productInfo={this.state.view.params} setView={this.setView} addToCart={this.addToCart}/>;
    }
  }

  render() {
    return (
      <div className="ui container">
      <BrowserRouter>
      <div>
        <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
        <Route exact path='/'>
        <div className='container'>
          {this.renderView()}
          </div>
          </Route>
        <Route exact path='/signupPage'>
          <SignupPage />
        </Route>
        <Route exact path='/loginpage'>
          <LoginPage />
        </Route>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}
