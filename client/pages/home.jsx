/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductListItem from '../components/productlistitem';
import CartSummary from '../pages/cart-summary';

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
          <h3 className="top-seller">Top Sellers</h3>
          <h3 id="top-rated">Top Rated Products</h3>
          <h3 id="newest-arrivals">Newest Arrivals</h3>
          <section className="row">
          {this.state.products.map(product => <ProductListItem key={product.productId} productInfo={product} setView={this.props.setView} />)}
        </section>
          </div>
    );
  }
}
