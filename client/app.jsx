/* eslint-disable no-unused-vars */
import React from 'react';
import Home from './pages/home';
import Loginpage from './pages/loginpage';
import SignupPage from './pages/signupPage';
import { parseRoute } from './lib';

export default class App extends React.Component {
  render() {
    return <Home />;
  }
}
