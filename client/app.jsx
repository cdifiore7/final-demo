/* eslint-disable no-unused-vars */
import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import SignupPage from './pages/signupPage';
import { Switch, Route, Link, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import Signup from './components/signup';

export default class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
        <div>
          <Home />
          <Route path='/' exact Component={Home} />
          <Route path='/api/auth/sign-up' exact Component={Signup} />
        </div>
        </BrowserRouter>
      </div>
    );
  }
}
