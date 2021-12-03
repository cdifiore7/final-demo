/* eslint-disable no-unused-vars */
import React from 'react';
import Quantity from './quantitytoggle';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader } from 'reactstrap';
const styles = {
  image: {
    width: '100%',
    height: '350px',
    objectFit: 'contain'
  }
};

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.viewParams.productId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ product: resp });
      });
  }

  render() {
    if (!this.state.product) {
      return <h1>Loading Info</h1>;
    } else {
      const { productId, image, name, supplierId, description, price } = this.state.product;
      return (
    <div key={this.state.product.id} className='card cardDetails col-12 mx-6 my-6'>
    <div className="product-body">
    <div className='row-justify-content-center'>
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
          </div>
        </div>
      </div>
      </div>
      );
    }
  }
}
