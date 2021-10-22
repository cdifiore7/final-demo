/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import { parseRoute } from './lib';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginpage';
import Cart from './components/cart';

export default class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
        <div>
          <Route exact path ='/'>
          <Home />
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
        </div>
        </BrowserRouter>
      </div>
    );
  }
}
