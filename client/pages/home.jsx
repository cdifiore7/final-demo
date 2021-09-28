/* eslint-disable no-unused-vars */
import React from 'react';
import LoginPage from './loginpage';
import SignupPage from './signupPage';
import { parseRoute } from '../lib/';

export default function Home(props) {

  return (
    <div>
      <SignupPage />
    </div>
  );

}
