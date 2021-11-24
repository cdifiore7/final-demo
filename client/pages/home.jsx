/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductListItem from '../components/productlistitem';
const styles = {
  product: {
    display: 'block',
    cursor: 'pointer'
  },
  image: {
    height: '300px',
    objectFit: 'contain'
  },
  description: {
    height: '4.5rem',
    overflow: 'hidden'
  }
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };

  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products.php')
      .then(resp => resp.json())
      .then(resp => this.setState({ products: resp }));
  }

  render() {
    return (
        <div className="container">
        <h2 id="logo">MegaPower PCs</h2>
        <hr id="top-line"></hr>
        <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
        <Link to= '/loginpage'>
        <button className="sign-in">Sign In/Register</button>
        </Link>
        <Link to ='/cart'>
        <img className="cart-icon" src ="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=170667a&w=0&h=kEh5VLsTHukWc7xf2BvUs8ssqS_d7vkK0-xU3MDpO7s=" />
          </Link>
          <section className="row">
            {this.state.products.map(product => <ProductListItem key={product.productId} productInfo={product} />)}
          </section>
          </div>
    );
  }
}
