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
import CartSummary from './pages/cart-summary';
import Header from './pages/header';
import CartSummaryItem from './pages/cart-item';

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
    this.placeOrder = this.placeOrder.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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

  placeOrder(order) {
    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/orders', options)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      });

  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return <Home setView={this.setView} cartState={this.state.cart}/>;
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
