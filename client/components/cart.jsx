/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends React.Component {
  render() {
    return (
      <div className="container">
      <Link to ="/">
      <h2 id="logo">MegaPower PCs</h2>
      </Link>
      <hr id="top-line"></hr>
      <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
      <Link to= '/loginpage'>
      <button className="sign-in">Sign In/Register</button>
      </Link>
      <Link to ='/cart'>
      <img className="cart-icon" src ="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s=" />
      </Link>
      <div className="container" id="cartbox">
        <h5>Your Cart</h5>
        <hr></hr>
      </div>
      </div>
    );
  }
}
