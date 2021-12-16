/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import App from '../app';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productInfo.productId}`)
      .then(res => res.json())
      .then(resp => {
        this.setState({ product: resp });
      });
  }

  render() {
    if (!this.state.product) {
      return <h1>Loading Product info</h1>;
    } else {
      const { name, imageUrl, price, description, productId } = this.state.product;
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
        <div className="container" id='productdetailcard'>
        <section className="row">
        <div className="card shadow-sm">
          <div id="details-home-button">
            <button onClick={() => this.props.setView('catalog', {})}className="btn">&#8592; Back to Home</button>
          </div>
          <div className="row col-12 mt-2 mb-2">
            <div className="col-4">
              <img className="product-details-image card-img-top" src={imageUrl} alt=""/>
            </div>
            <div className="col-8 card-body">
              <h3 className="card-title">{name}</h3>
              <p className="card-text text-muted">{price}</p>
              <p className="card-text">{description}</p>
              <button className="btn btn-primary" onClick={() => this.props.addToCart(productId)}>Add To Cart</button>
            </div>
            </div>
          </div>
        </section>
        </div>
        </div>
      );
    }
  }
}
