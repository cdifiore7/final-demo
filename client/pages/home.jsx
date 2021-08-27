/* eslint-disable no-unused-vars */
import React from 'react';
import userlogin from './login';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Link to={'/login'}>
      <button id="signinregister">Login/Register</button>
      </Link>
    </div>
  );
}
