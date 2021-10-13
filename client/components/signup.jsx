import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.accountCreate = this.accountCreate.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let message = '';
    if (!this.state.email) {
      message = 'Email is required';
      this.setState({ message: message });
    } else if (!this.state.password) {
      message = 'Password is required';
      this.setState({ message: message });
    } else if (this.state.password !== this.state.passwordConfirm) {
      message = 'Passwords do not match';
      this.setState({ message: message });
    } else {
      const newAccount = {
        email: this.state.email,
        password: this.state.password
      };
      this.accountCreate(newAccount);
      this.setState({ email: '', password: '', passwordConfirm: '' });
    } window.location.hash = '';
  }

  accountCreate(newAccount) {
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    })
      .then(response => {
        if (!response.ok) {
          this.setState({ errorMessage: 'Email already registered' });
        } else {
          this.setState({ errorMessage: '' });
          response.JSON();
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    const value = this.state;
    const message = this.state.message;
    const errorMessage = this.state.errorMessage;
    return (
      <div className="container">
        <Link to ="/">
        <h2 id="logo">MegaPower PCs</h2>
        </Link>
        <hr id="top-line"></hr>
          <div className="container" id="whitebox">
          <form onSubmit={this.handleSubmit}>
            <h3 id="register-header">Register</h3>
            <h6 id="email-registration">Email Address</h6>
            <input type="email" className="form-control" value={value.email} id="email-input" name="email" onChange={this.handleChange} />
            <h6 id="password-registration">Password</h6>
            <input type="password" className="form-control" value={value.password} id="password-input" name="password" onChange={this.handleChange} />
            <h6 id="confirm-password">Confirm Password</h6>
            <input type="password" className="form-control" value={value.passwordConfirm} id="password-input-confirm" name="passwordConfirm" onChange={this.handleChange} />
            <button type="submit" id="register-confirm">Register</button>
            <div className="help-block mt-2" id="mt-2"> {message}</div>
            <div className="help-block mt-2" id="mt-2"> {errorMessage}</div>
            </form>
            </div>
      </div>
    );
  }
}
