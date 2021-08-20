import React, { Component } from 'react';

export default class userlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
    <div className="container">
      <h2>Micro Egg PCs</h2>
    <form onSubmit={this.handleSubmit}>
      <div className="container" size="lg" id="email">
        <h3>Email</h3>
        <input type="text" className="form-control"></input>
      </div>
      <div className="container" size="lg" id="password">
        <h3>Password</h3>
        <input type="text" className="form-control"></input>
      </div>
      <button type="submit">
        Login
        </button>
</form>
</div>);
  }
}
