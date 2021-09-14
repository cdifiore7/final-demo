/* eslint-disable no-unused-vars */
import React from 'react';
import Login from '../components/login';
import LoginPage from './loginpage';
import SignupPage from './signupPage';
import Signup from '../components/signup';
import { render } from 'react-dom';

export default function Home(props) {
  return (
    <div>
      <SignupPage />
    </div>
  );

}
