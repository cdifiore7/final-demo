/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import { parseRoute } from './lib';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginpage';
import Cart from './components/cart';
import ProductDetails from './components/productdetails';
import ProductListItem from './components/productlistitem';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route: route });
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
    } else {
      return <ProductDetails productInfo={this.state.view.params} setView={this.setView}/>;
    }
  }

  render() {
    return (
    <div className="ui container">
    <BrowserRouter>
    <div>
      <Route exact path ='/'>
        {this.renderView()}
      </Route>
      <Route exact path='/signupPage'>
        <SignupPage />
      </Route>
      <Route exact path='/loginpage'>
        <LoginPage />
      </Route>
      <Route exact path='/cart'>
        <Cart />
      </Route>
      <Route exact path='/productdetails'>
      <ProductDetails />
      </Route>
      <Route exact path="/productlistitem">
      <ProductListItem />
      </Route>
    </div>
    </BrowserRouter>
    </div>
    );
  }
}
