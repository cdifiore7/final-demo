import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <Link to= '/'>
        <h2 id="logo" onClick={() => props.setView('catalog', { params: {} })}>MegaPower PCs</h2>
        </Link>
        <hr id="top-line"></hr>
        <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
        <Link to= '/loginpage'>
        <button className="sign-in-button">Sign In/Register</button>
        </Link>
      <h5 onClick={() => props.setView('cart', {})}>
      <img id="cart-icon" src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s="/>
      </h5>
      <div className="cart-section">
      <p className="pr-2">{props.cartItemCount} Item(s)</p>
      </div>
    </header>
  );
}
