/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Home from './home';

class userlogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'user@gmail.com',
      password: 'password1'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bing(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    fetch('api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          alert('Username and/or password not found');
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(data => {
        this.setState({ users: data });
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
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
        <input type="email" className="form-control" id="textbox1" onChange={this.handleChange}></input>
      </div>
      <div className="container" size="lg">
        <h3 id="password">Password</h3>
        <input type="password" className="form-control" id="textbox2" onChange={this.handleChange}></input>
      </div>
      <h2 id="sign-up">New to Micro Egg?</h2>
      <button type="submit" id="enter" onClick={this.handleSubmit}>
        ENTER
        </button>
</form>
</div>);
  }
}

export default userlogin;
