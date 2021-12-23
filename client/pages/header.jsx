import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
        <h2 id="logo">MegaPower PCs</h2>
        <hr id="top-line"></hr>
        <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
        <Link to= '/loginpage'>
        <button className="sign-in">Sign In/Register</button>
        </Link>
      <div className="cart-section">
      <i className="fas fa-shopping-cart" id="fa-cart" onClick={() => props.setView('cart', {})}></i>
      </div>
    </header>
  );
}
