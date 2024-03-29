/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import App from '../app';
import priceFormatter from '../lib/price-formatter';

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
        <Link to= "/">
        <h2 id="logo" onClick={() => this.props.setView('catalog', {})}>MegaPower PCs</h2>
        </Link>
        <hr id="top-line"></hr>
        <input type="search" className="searchbar" id="searchbar" name="search" placeholder="Search Products"></input>
        <Link to= '/loginpage'>
        <button className="sign-in-button">Sign In/Register</button>
        </Link>
        <div className="container" id='productdetailcard'>
        <section className="row">
        <div className="card shadow-sm">
          <div className="row col-12 mt-2 mb-2">
            <div className="col-4">
              <img className="product-details-image card-img-top" src={imageUrl} alt=""/>
            </div>
            <div className="col-8 card-body">
              <h3 className="card-title">{name}</h3>
              <p className="card-text text-muted">{priceFormatter(price)}</p>
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
