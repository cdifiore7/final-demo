/* eslint-disable no-unused-vars */
import React from 'react';
import Home from '../pages/home';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerButton = this.registerButton.bind(this);
  }

  registerButton() {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/login', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          const { handleLogin } = this.context;
          handleLogin(result);
        }
      });
  }

  render() {
    return (
      <div className="container">
        <h2 id="logo">Micro Egg PCs</h2>
        <hr id="top-line"></hr>
        <form onSubmit={this.handleSubmit} method="POST">
          <div className="container" size="lg" id="email">
            <h2 id="signin">Sign In</h2>
            <h3 id="email-address">Email Address</h3>
            <input type="email" className="form-control" id="textbox1" name="email"></input>
          </div>
          <div className="container" size="lg">
            <h3 id="password">Password</h3>
            <input type="password" className="form-control" id="textbox2" name="password"></input>
          </div>
          <h2 id="sign-up">New to Micro Egg? <button type="button" onClick={this.registerButton} id="signupbutton">Sign Up!</button> </h2>
          <button type="submit" id="enter">
            ENTER
          </button>
        </form>
      </div>);
  }
}

export default Login;
