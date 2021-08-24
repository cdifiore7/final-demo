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
      <h2 id="logo">Micro Egg PCs</h2>
      <hr id="top-line"></hr>
    <form onSubmit={this.handleSubmit}>
      <div className="container" size="lg" id="email">
        <h2 id="signin">Sign In</h2>
        <h3 id="email-address">Email Address</h3>
        <input type="text" className="form-control" id="textbox1"></input>
      </div>
      <div className="container" size="lg">
        <h3 id="password">Password</h3>
        <input type="text" className="form-control" id="textbox2"></input>
      </div>
      <h2 id="sign-up">New to Micro Egg?</h2>
      <button type="submit" id="enter">
        ENTER
        </button>
</form>
</div>);
  }
}
