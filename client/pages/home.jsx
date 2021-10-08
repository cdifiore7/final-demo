/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import LoginPage from './loginpage';
import SignupPage from './signupPage';
import { parseRoute } from '../lib/';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
    <div className="container">
    <h2 id="logo">Micro Egg PCs</h2>
    <hr id="top-line"></hr>
    <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
    <Link to= '/api/auth/sign-up'>
    <button className="sign-in">Sign In/Register</button>
    </Link>
    <img className="cart-icon" src ="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s=" />
    <h4 id="top-sellers">Top Sellers</h4>
    <div className="container" id="productbox">
      <h5>Products</h5>
      <hr></hr>
      <h6 className='productlisting'>Deals of the Day</h6>
      <h6 className='productlisting'>Clearance</h6>
      <h6 className='productlisting'>Desktop PCs</h6>
      <h6 className='productlisting'>Laptops</h6>
      <h6 className='productlisting'>PC Components</h6>
      <h6 className='productlisting'>Gaming</h6>
    </div>
    <h4 id="top-rated">Top Rated Items</h4>
    <h4 id="newproducts">Newest Arrivals</h4>
    </div>
    );
  }
}
