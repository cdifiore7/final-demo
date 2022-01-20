/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
          alert('User not found');
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
        <Link to ='/'>
        <h2 id="logo">MegaPower PCs</h2>
        </Link>
        <hr id="top-line"></hr>
        <div className="container" id="whitebox">
        <form onSubmit={this.handleSubmit} method="POST">
          <div className="container" size="lg" id="email">
            <h3 id="signin">Sign In</h3>
            <h3 id="email-address">Email Address</h3>
            <input type="email" className="form-control" id="textbox1" name="email" onChange={this.handleChange}
            value={this.state.email}></input>
          </div>
          <div className="container" size="lg">
            <h3 id="password">Password</h3>
            <input type="password" className="form-control" id="textbox2" name="password" onChange={this.handleChange} value={this.state.password}></input>
          </div>

          <h2 id="sign-up">New to MegaPower?
          <Link to ="/signupPage">
           <button type="button" id="signupbutton">Sign Up!</button> </Link>  </h2>
          <button type="submit" id="enter">
            ENTER
          </button>
        </form>
        </div>
      </div>);
  }
}

export default withRouter(Login);
