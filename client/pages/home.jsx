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

export default class Home extends Component {
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
    fetch('/api/products')
      .then(resp => resp.json())
      .then(resp => this.setState({ products: resp }));
  }

  render() {
    return (
      <div className="container">
      <h1>Catalog</h1>
      <hr />
      <div className="row">
        {
          this.state.products.map(product => (
            <div key={product.productId} className="col-12 col-md-6 col-lg-4">
              <Product product={product} />
            </div>
          ))
        }
      </div>
    </div>
    );
  }
}
function Product(props) {
  const { productId, name, price, imageUrl, shortDescription } = props.product;
  return (
    <a
      href={`#products?productId=${productId}`}
      style={styles.product}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <img src={imageUrl} className="card-img-top" alt={name} style={styles.image}/>
      <div className="card-body">
        <h5 className="card-title">{ name }</h5>
        <p className="card-text text-secondary">{ price }</p>
        <p className="card-text"> { shortDescription }</p>
      </div>
    </a>
  );
}
