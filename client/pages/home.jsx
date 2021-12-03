/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductListItem from '../components/productlistitem';
const styles = {
  product: {
    display: 'block',
    cursor: 'pointer',
    top: '120px',
    right: '-10px',
    margin: '45px',
    width: '300px'
  },
  image: {
    height: '100px',
    with: '50px',
    objectFit: 'contain'
  },
  description: {
    height: '3rem',
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
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
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
          <h3 className="top-seller">Top Sellers</h3>
          <h3 id="top-rated">Top Rated Products</h3>
          <h3 id="newest-arrivals">Newest Arrivals</h3>
          <div className="row">
          {
            this.state.products.map(product => (
              <div key={product.productId} className="col-12 col-md-6 col-lg-4">
            <Product product={product} />
            </div>
            ))}
          </div>
          </div>

    );
  }
}
function Product(props) {
  // eslint-disable-next-line no-unused-vars
  const { productId, name, price, imageUrl, description } = props.product;
  return (
    <a
      href={`#products?productId=${productId}`}
      style={styles.product}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <img src={imageUrl} className="card-img-top" alt={name} style={styles.image}/>
      <div className="card-body">
        <h5 className="card-title">{ name }</h5>
        <p className="card-text text-secondary">{ price }</p>
        <p className="card-text" style={styles.description}>{ description }</p>
      </div>
    </a>
  );
}
