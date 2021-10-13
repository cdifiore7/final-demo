/* eslint-disable no-unused-vars */
import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/loginpage';

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
        </div>
        </BrowserRouter>
      </div>
    );
  }
}
